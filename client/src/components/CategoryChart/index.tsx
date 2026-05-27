"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface CategoryData {
  categoria: string;  
  quantidade: number; 
}

interface CategoryChartProps {
  data: CategoryData[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Livros por Categoria
      </h2>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barSize={60} // reduzi de 120 para 60 para as barras não ficarem coladas se tiver pouca categoria!
          >
            <XAxis 
              dataKey="categoria" 
              stroke="#717182" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              dy={10}
            />
            <YAxis 
              stroke="#717182" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(0, 193, 137, 0.04)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-gray-100 bg-white p-2 shadow-sm text-xs font-medium text-gray-900">
                      {`${payload[0].name}: ${payload[0].value}`}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="quantidade" 
              name="Quantidade"
              fill="#00C389" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}