"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2, Pencil, RefreshCw, CheckCircle2, AlertCircle, Sparkles, Check } from "lucide-react";
import { PricingPlanDto } from "@/types/api.types";
import { paymentService } from "@/services/payment.service";

export default function PricingPlansPage() {
  const [plans, setPlans] = useState<PricingPlanDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlanDto | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(499);
  const [currency, setCurrency] = useState("INR");
  const [durationDays, setDurationDays] = useState<number>(365);
  const [productType, setProductType] = useState("AllExamsPass");
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);

  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await paymentService.getPlans();
      if (res.success && res.data) {
        setPlans(res.data);
      } else {
        setError(res.message || "Failed to load pricing plans.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while loading pricing plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setName("");
    setDescription("");
    setPrice(499);
    setCurrency("INR");
    setDurationDays(365);
    setProductType("AllExamsPass");
    setIsActive(true);
    setDisplayOrder(1);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: PricingPlanDto) => {
    setEditingPlan(plan);
    setName(plan.name);
    setDescription(plan.description || "");
    setPrice(plan.price);
    setCurrency(plan.currency || "INR");
    setDurationDays(plan.durationDays || 365);
    setProductType(plan.productType || "AllExamsPass");
    setIsActive(plan.isActive !== false);
    setDisplayOrder(plan.displayOrder || 1);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setNotification(null);

      const payload = {
        name: name.trim(),
        description: description.trim() || undefined,
        price: Number(price),
        currency: currency.trim() || "INR",
        durationDays: Number(durationDays),
        productType: productType.trim() || "AllExamsPass",
        isActive,
        displayOrder: Number(displayOrder),
      };

      if (editingPlan) {
        const res = await paymentService.updateAdminPlan(editingPlan.id, payload);
        if (res.success) {
          setNotification({ type: "success", message: "Plan updated successfully!" });
          setIsModalOpen(false);
          await loadPlans();
        } else {
          setNotification({ type: "error", message: res.message || "Failed to update plan." });
        }
      } else {
        const res = await paymentService.createAdminPlan(payload);
        if (res.success) {
          setNotification({ type: "success", message: "Plan created successfully!" });
          setIsModalOpen(false);
          await loadPlans();
        } else {
          setNotification({ type: "error", message: res.message || "Failed to create plan." });
        }
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err.message || "An error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this pricing plan?")) return;

    try {
      const res = await paymentService.deleteAdminPlan(id);
      if (res.success) {
        setPlans((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(res.message || "Failed to delete pricing plan.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CreditCard className="h-7 w-7 text-cyan-600" /> Pricing & Subscription Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure subscription passes, pricing tiers, validity periods, and active status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={loadPlans} className="text-xs font-bold gap-1.5" disabled={loading}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={handleOpenCreateModal} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Create New Plan
          </Button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Plans Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <div className="h-8 w-8 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold">Loading pricing plans...</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200">
          <CreditCard className="h-10 w-10 mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No pricing plans found</p>
          <p className="text-xs text-slate-400 mt-1">Create subscription packages for student access.</p>
          <Button onClick={handleOpenCreateModal} className="text-xs bg-cyan-600 text-white font-bold mt-3">
            Create First Plan
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-6 flex flex-col justify-between relative border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={plan.isActive !== false ? "success" : "secondary"} className="text-[10px]">
                    {plan.isActive !== false ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-400">
                    {plan.durationDays || 365} Days
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{plan.description || "Full access to mock tests & test series."}</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                    ₹{plan.price}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5 font-semibold">/{plan.durationDays || 365} days</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <p className="flex items-center gap-1.5 font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Product: <strong className="text-slate-800 dark:text-slate-200">{plan.productType || "All Exams Pass"}</strong>
                  </p>
                  <p className="flex items-center gap-1.5 font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Display Rank: #{plan.displayOrder || 1}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModal(plan)}
                  className="text-xs font-bold gap-1"
                >
                  <Pencil className="h-3.5 w-3.5 text-indigo-600" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(plan.id)}
                  className="text-xs font-bold gap-1 text-rose-600 hover:bg-rose-50 border-rose-200"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Dialog for Create/Edit Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <Card className="w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold">
                {editingPlan ? `Edit Pricing Plan #${editingPlan.id}` : "Create Pricing Plan"}
              </CardTitle>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="planName" className="font-bold text-xs">Plan Title *</Label>
                  <Input
                    id="planName"
                    placeholder="e.g. Yearly All Exams Pass, Monthly Pass"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="planPrice" className="font-bold text-xs">Price (₹) *</Label>
                    <Input
                      id="planPrice"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="planDuration" className="font-bold text-xs">Duration (Days) *</Label>
                    <Input
                      id="planDuration"
                      type="number"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="prodType" className="font-bold text-xs">Product Type</Label>
                    <Input
                      id="prodType"
                      placeholder="AllExamsPass"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="dispOrder" className="font-bold text-xs">Display Rank Order</Label>
                    <Input
                      id="dispOrder"
                      type="number"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="planDesc" className="font-bold text-xs">Description</Label>
                  <textarea
                    id="planDesc"
                    rows={2}
                    placeholder="Key benefits and feature highlights..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="h-4 w-4 text-cyan-600 rounded cursor-pointer"
                    />
                    <span>Active for Purchase</span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs">
                    {submitting ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
