import React, { ElementType } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  iconColorClass: string;     
  iconBgColorClass: string;  
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  iconColorClass,
  iconBgColorClass,
}: MetricCardProps) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-md min-w-[240px]">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColorClass}`}>
        <Icon className={`h-6 w-6 ${iconColorClass}`} />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-400">{title}</span>
        <span className="text-2xl font-semibold text-gray-900 mt-1">{value}</span>
      </div>
    </div>
  );
}