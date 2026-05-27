"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface BookCardMobileProps {
  title: string;
  status: "RETURNED" | "IN_PROGRESS" | "OVERDUE";
  loanDate: string;
  dueDate: string;
}

export function BookCardMobile({ title, status, loanDate, dueDate }: BookCardMobileProps) {
  
  const getStatusStyles = () => {
    switch (status) {
      case "RETURNED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "OVERDUE":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "IN_PROGRESS":
      default:
        return "bg-purple-50 text-purple-600 border-purple-100";
    }
  };

  const getStatusLabel = () => {
    if (status === "RETURNED") return "Devolvido";
    if (status === "OVERDUE") return "Atrasado";
    return "Em andamento";
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col items-center text-center">
        {/* book title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>

        {/* status badge */}
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()} mb-4`}>
          {getStatusLabel()}
        </span>

        {/* dates info block */}
        <div className="w-full space-y-2 border-t border-gray-50 pt-3 text-sm text-gray-500">
          {/* loan date */}
          <div className="flex items-center justify-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span>Locação: {loanDate}</span>
          </div>

              {/* due date */}
          <div className="flex items-center justify-center gap-2">
              <Calendar size={16} className="text-gray-400" />
            <span>Devolução: {dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}