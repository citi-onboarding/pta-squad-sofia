import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { Calendar } from "lucide-react-native"; 

const imageSources: Record<string, ImageSourcePropType> = {
  tecnologia: require("../../assets/images/Tecnologia.png"),
  infantil: require("../../assets/images/Infantil.png"),
  romance: require("../../assets/images/Romance.png"),
  historia: require("../../assets/images/Historia.png"),
  ciencias: require("../../assets/images/Ciencias.png"),
};

interface BookCardMobileProps {
  title: string;
  category?: string; 
  status: "RETURNED" | "IN_PROGRESS" | "OVERDUE";
  loanDate: string;
  dueDate: string;
}

export function BookCardMobile({ title, category, status, loanDate, dueDate }: BookCardMobileProps) {
  
  const normalizedCategory = (category || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const imageSource = imageSources[normalizedCategory] || imageSources.tecnologia;

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
    <View className="w-full max-w-sm rounded-xl border border-gray-100 bg-white pt-8 pb-8 pr-6 pl-36 shadow-sm flex-row items-center relative overflow-hidden">
      
      <View className="absolute left-5 justify-center">
        <Image 
          source={imageSource} 
          className="rounded-md bg-gray-50 border border-gray-100"
          style={{ width: 102, height: 128 }} 
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 items-start justify-center">
        {/* book title */}
        <Text className="text-lg font-semibold text-gray-800 mb-1.5" numberOfLines={2}>
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

    </View>
  );
}