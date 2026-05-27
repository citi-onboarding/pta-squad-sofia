import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "lucide-react-native"; 

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
        return {
          badge: "bg-[#00C38933] border-[#00C3894D]",
          text: "text-[#00C389]"
        };
      case "OVERDUE":
        return {
          badge: "bg-[#EF444433] border-[#EF44444D]",
          text: "text-[#EF4444]"
        };
      case "IN_PROGRESS":
      default:
        return {
          badge: "bg-[#FEF9C2] border-[#FFDF20]",
          text: "text-[#A65F00]"
        };
    }
  };

  const getStatusLabel = () => {
    if (status === "RETURNED") return "Devolvido";
    if (status === "OVERDUE") return "Atrasado";
    return "Em andamento";
  };

  const styles = getStatusStyles();

  return (
    <View className="w-full max-w-sm rounded-xl border border-gray-100 bg-white pt-5 pb-5 pl-12 pr-6 shadow-sm items-start justify-center">
      
      {/* book title */}
      <Text className="text-lg font-semibold text-gray-800 mb-1.5">
        {title}
      </Text>

      {/* status badge */}
      <View className={`px-3 py-0.5 rounded-full border ${styles.badge} mb-3`}>
        <Text className={`text-xs font-medium ${styles.text}`}>
          {getStatusLabel()}
        </Text>
      </View>

      {/* dates block */}
      <View className="w-full gap-1.5">
        
        {/* loan date */}
        <View className="flex-row items-center gap-2">
          <Calendar size={16} color="#9ca3af" />
          <Text className="text-sm text-gray-500">Locação: {loanDate}</Text>
        </View>

        {/* due date */}
        <View className="flex-row items-center gap-2">
          <Calendar size={16} color="#9ca3af" />
          <Text className="text-sm text-gray-500">Devolução: {dueDate}</Text>
        </View>

      </View>
    </View>
  );
}