"use client";

import React, { useState } from "react";
import { CategoryTreeDto } from "@/types/api.types";
import { ChevronRight, ChevronDown, Folder, FolderOpen, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface CategoryTreeProps {
  categories: CategoryTreeDto[];
  onDelete: (id: number) => void;
}

const CategoryTreeNode: React.FC<{
  node: CategoryTreeDto;
  onDelete: (id: number) => void;
  level?: number;
}> = ({ node, onDelete, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.subCategories && node.subCategories.length > 0;

  return (
    <div className="space-y-1">
      <div
        className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs group"
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex items-center gap-3">
          {hasChildren ? (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <span className="w-6" />
          )}

          {hasChildren ? (
            <FolderOpen className="h-4.5 w-4.5 text-amber-400 shrink-0" />
          ) : (
            <Folder className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
          )}

          <div>
            <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {node.name}
            </span>
            {node.description && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-md mt-0.5">
                {node.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link href={`/admin/categories/${node.id}/edit`}>
            <button
              className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-950/60 transition-colors"
              title="Edit Category"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </Link>
          <button
            onClick={() => onDelete(node.id)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/60 transition-colors"
            title="Delete Category"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="space-y-1">
          {node.subCategories.map((sub) => (
            <CategoryTreeNode key={sub.id} node={sub} onDelete={onDelete} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onDelete }) => {
  return (
    <div className="space-y-2">
      {categories.map((cat) => (
        <CategoryTreeNode key={cat.id} node={cat} onDelete={onDelete} />
      ))}
    </div>
  );
};
