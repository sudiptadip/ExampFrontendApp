"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  GripVertical,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  X,
  FolderPlus,
} from "lucide-react";
import { Category, CategoryTreeDto } from "@/types/api.types";
import { categoryService } from "@/services/category.service";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const categoryId = Number(resolvedParams.id);
  const router = useRouter();

  const [categoryTree, setCategoryTree] = useState<CategoryTreeDto[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Currently selected node for editing in the MODIFIER card
  const [selectedNode, setSelectedNode] = useState<{ id: number; name: string } | null>(null);
  const [labelName, setLabelName] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({});
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("sm");

  // Modal states for Add Subcategory & Delete Node
  const [isAddSubModalOpen, setIsAddSubModalOpen] = useState(false);
  const [targetParent, setTargetParent] = useState<{ id: number; name: string } | null>(null);
  const [subName, setSubName] = useState("");
  const [submittingSub, setSubmittingSub] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetDelete, setTargetDelete] = useState<{ id: number; name: string } | null>(null);
  const [deletingNode, setDeletingNode] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const [listRes, treeRes] = await Promise.all([
        categoryService.getCategories(),
        categoryService.getCategoryTree(),
      ]);

      if (listRes.success && listRes.data) {
        setAllCategories(listRes.data);
      }

      if (treeRes.success && treeRes.data) {
        const findNode = (nodes: CategoryTreeDto[]): CategoryTreeDto | null => {
          for (const node of nodes) {
            if (node.id === categoryId) return node;
            if (node.subCategories && node.subCategories.length > 0) {
              const found = findNode(node.subCategories);
              if (found) return found;
            }
          }
          return null;
        };

        const target = findNode(treeRes.data);
        if (target) {
          setCategoryTree([target]);
          setSelectedNode({ id: target.id, name: target.name });
          setLabelName(target.name);

          const autoExpand: Record<number, boolean> = { [target.id]: true };
          if (target.subCategories) {
            target.subCategories.forEach((c) => {
              autoExpand[c.id] = true;
            });
          }
          setExpandedNodes(autoExpand);
        } else {
          setCategoryTree(treeRes.data);
        }
      }
    } catch (err) {
      console.error("Failed to load category hierarchy", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [categoryId]);

  const toggleExpand = (id: number) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const collapseAll = () => setExpandedNodes({});

  const handleSelectNode = (node: CategoryTreeDto) => {
    setSelectedNode({ id: node.id, name: node.name });
    setLabelName(node.name);
    setNotification(null);
  };

  const openAddSubModal = (parent: { id: number; name: string }) => {
    setTargetParent(parent);
    setSubName("");
    setIsAddSubModalOpen(true);
  };

  const openDeleteModal = (node: { id: number; name: string }) => {
    setTargetDelete(node);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNode || !labelName.trim()) return;

    try {
      setSubmitting(true);
      setNotification(null);

      const res = await categoryService.updateCategory(selectedNode.id, {
        name: labelName.trim(),
      });

      if (res.success) {
        setNotification({ type: "success", message: `Updated node "${labelName.trim()}" successfully!` });
        await fetchCategoryData();
      } else {
        setNotification({ type: "error", message: res.message || "Failed to update node." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.response?.data?.message || err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetParent || !subName.trim()) return;

    try {
      setSubmittingSub(true);
      const res = await categoryService.createCategory({
        name: subName.trim(),
        parentCategoryId: targetParent.id,
      });

      if (res.success) {
        setIsAddSubModalOpen(false);
        setSubName("");
        setNotification({ type: "success", message: `Subcategory "${subName.trim()}" added under "${targetParent.name}".` });
        await fetchCategoryData();
      } else {
        alert(res.message || "Failed to add subcategory.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setSubmittingSub(false);
    }
  };

  const handleDeleteNodeConfirm = async () => {
    if (!targetDelete) return;

    try {
      setDeletingNode(true);
      const res = await categoryService.deleteCategory(targetDelete.id);

      if (res.success) {
        setIsDeleteModalOpen(false);
        setNotification({ type: "success", message: `Deleted category "${targetDelete.name}".` });
        await fetchCategoryData();
      } else {
        alert(res.message || "Failed to delete category.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setDeletingNode(false);
    }
  };

  const handleDiscard = () => {
    if (selectedNode) {
      setLabelName(selectedNode.name);
    }
    setNotification(null);
  };

  const renderTreeNode = (node: CategoryTreeDto, level: number = 0) => {
    const hasChildren = node.subCategories && node.subCategories.length > 0;
    const isExpanded = !!expandedNodes[node.id];
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => handleSelectNode(node)}
          className={`group flex items-center justify-between py-2.5 px-3 rounded-2xl transition-all cursor-pointer ${
            isSelected
              ? "bg-indigo-950/80 text-white font-extrabold border border-indigo-500/50 shadow-md"
              : "bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white border border-transparent"
          } ${fontSize === "sm" ? "text-xs sm:text-sm" : fontSize === "md" ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="text-slate-500 group-hover:text-slate-300">
              <GripVertical className="h-4 w-4" />
            </div>

            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                className="h-5 w-5 rounded border border-slate-700 bg-slate-950 flex items-center justify-center text-slate-300 hover:border-slate-500"
              >
                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>
            ) : (
              <div className="w-5" />
            )}

            {isExpanded && hasChildren ? (
              <FolderOpen className="h-4 w-4 text-indigo-400 shrink-0" />
            ) : (
              <Folder className="h-4 w-4 text-indigo-400 shrink-0" />
            )}

            <span className="truncate">{node.name}</span>

            <span className="text-[9px] font-extrabold tracking-wider text-indigo-300/80 uppercase ml-1">
              CATEGORY
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openAddSubModal({ id: node.id, name: node.name });
              }}
              title="Add Subcategory under this node"
              className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> Subcategory
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal({ id: node.id, name: node.name });
              }}
              title="Delete category node"
              className="p-1 rounded-md hover:bg-rose-950 text-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1 mt-1">
            {node.subCategories.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-slate-900 border border-slate-800 rounded-3xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  const rootCategoryName = selectedNode ? selectedNode.name : "Category";

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-2 pb-12 text-slate-100">
      <div>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Categories Overview
        </Link>

        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
            <Folder className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Edit: {rootCategoryName} - {categoryId}
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Subject & Topic Hierarchy Management
            </p>
          </div>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-950/80 text-emerald-200 border border-emerald-800"
              : "bg-rose-950/80 text-rose-200 border border-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs underline font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question Library Tree */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white">
                Question Library
              </h2>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
                SUBJECT & TOPIC HIERARCHY TREE
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-800 rounded-xl p-1 bg-slate-950 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFontSize("sm")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold ${fontSize === "sm" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
                >
                  Sm
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("md")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold ${fontSize === "md" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
                >
                  Md
                </button>
              </div>
            </div>
          </div>

          {/* Tree Node List */}
          <div className="space-y-1.5 min-h-[350px] max-h-[550px] overflow-y-auto pr-1">
            {categoryTree.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-semibold">No categories available in tree.</div>
            ) : (
              categoryTree.map((rootNode) => renderTreeNode(rootNode, 0))
            )}
          </div>
        </div>

        {/* Right Column: MODIFIER Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative space-y-0">
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-indigo-500 to-purple-500" />

            <div className="p-7 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-300">
                  MODIFIER
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-black text-xl">
                  <Folder className="h-5 w-5 text-indigo-400" />
                  <span>Edit Node</span>
                </div>
                <p className="text-xs font-medium text-slate-400">
                  Refine category title and hierarchy structure.
                </p>
              </div>

              <form onSubmit={handleUpdateNode} className="space-y-4">
                <div className="space-y-2 pt-1">
                  <label htmlFor="labelName" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    LABEL NAME
                  </label>
                  <input
                    id="labelName"
                    type="text"
                    value={labelName}
                    onChange={(e) => setLabelName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Updating..." : "Update Node"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="py-3 px-6 rounded-2xl border border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800 font-bold text-xs transition-all cursor-pointer"
                  >
                    Discard
                  </button>
                </div>
              </form>

              {selectedNode && (
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    HIERARCHY CONTROLS
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => openAddSubModal(selectedNode)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Plus className="h-4 w-4" /> Add Subcategory under "{selectedNode.name}"
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(selectedNode)}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" /> Delete Node ({selectedNode.name})
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADD SUBCATEGORY MODAL */}
      {isAddSubModalOpen && targetParent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-indigo-400" />
                Add Subcategory
              </h3>
              <button onClick={() => setIsAddSubModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-400">
              Creating a child subcategory directly under <strong className="text-white">"{targetParent.name}"</strong> (ID: {targetParent.id}).
            </p>

            <form onSubmit={handleCreateSubcategory} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="subNameInput" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  SUBCATEGORY NAME *
                </label>
                <input
                  id="subNameInput"
                  type="text"
                  placeholder="e.g. Physics, Algebra, Sets & Functions..."
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSubModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingSub}
                  className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm disabled:opacity-50"
                >
                  {submittingSub ? "Creating..." : "Create Subcategory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE NODE MODAL */}
      {isDeleteModalOpen && targetDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-rose-500">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> Delete Category Node
              </h3>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-semibold leading-relaxed">
              Are you sure you want to delete <strong className="text-white font-black">"{targetDelete.name}"</strong> (ID: {targetDelete.id})? Any subcategories or questions under this node will also be affected.
            </p>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingNode}
                onClick={handleDeleteNodeConfirm}
                className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm disabled:opacity-50"
              >
                {deletingNode ? "Deleting..." : "Delete Node"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
