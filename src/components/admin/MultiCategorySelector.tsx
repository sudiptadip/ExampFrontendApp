"use client";

import React, { useState } from "react";
import { Category } from "@/types/api.types";
import { Tag, Search, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MultiCategorySelectorProps {
  categories: Category[];
  selectedCategoryIds: number[];
  onChange: (ids: number[]) => void;
}

export const MultiCategorySelector: React.FC<MultiCategorySelectorProps> = ({
  categories,
  selectedCategoryIds,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (id: number) => {
    if (selectedCategoryIds.includes(id)) {
      onChange(selectedCategoryIds.filter((item) => item !== id));
    } else {
      onChange([...selectedCategoryIds, id]);
    }
  };

  const removeCategory = (id: number) => {
    onChange(selectedCategoryIds.filter((item) => item !== id));
  };

  const selectedCategories = categories.filter((c) => selectedCategoryIds.includes(c.id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-indigo-400" /> Syllabus Categories & Tags *
        </label>
        <span className="text-[11px] text-slate-400 font-medium">
          {selectedCategoryIds.length} selected
        </span>
      </div>

      {/* Selected Tags Chips */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
          {selectedCategories.map((cat) => (
            <Badge
              key={cat.id}
              className="bg-indigo-600 text-white font-bold text-xs gap-1 pr-1.5 py-1 shadow-2xs"
            >
              <span>{cat.name}</span>
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="hover:bg-indigo-700 rounded-full p-0.5 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Categories Dropdown List */}
      <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl p-1.5 bg-slate-950 space-y-1">
        {filteredCategories.length === 0 ? (
          <div className="p-3 text-center text-xs text-slate-400">No categories found matching filter</div>
        ) : (
          filteredCategories.map((cat) => {
            const isSelected = selectedCategoryIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-indigo-950 text-indigo-300 border border-indigo-800"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
