import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList 
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; 
import { Search } from "lucide-react-native";
import { BookCardMobile } from "../src/components/BookCardMobile";
import { Image } from "react-native";

type BookStatus = "RETURNED" | "IN_PROGRESS" | "OVERDUE";

interface BookData {
  id: string;
  title: string;
  category: string;
  status: BookStatus;
  loanDate: string;
  dueDate: string;
}

const MOCK_DATA: BookData[] = [
  { id: '1', title: 'Dom Casmurro', category: 'romance', status: 'RETURNED', loanDate: '02/03/2026', dueDate: '12/03/2026' },
  { id: '2', title: 'Clean Code', category: 'tecnologia', status: 'IN_PROGRESS', loanDate: '15/04/2026', dueDate: '30/04/2026' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets(); 

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: insets.top }}>
      
      <View className="flex-row items-center px-6 py-4 bg-white border-b border-gray-200">
        
        <Image 
          source={require('../src/assets/images/logoCiti_semfundo.png')} 
          style={{ width: 69, height: 32, marginRight: 16 }} 
          resizeMode="contain"
        />

        <Text className="text-lg font-semibold text-gray-800">
          Meus Empréstimos
        </Text>
      </View>

      <View className="flex-1 px-6 pt-6">
        
        <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 h-12 mb-4">
          <Search size={20} color="#9ca3af" style={{ marginRight: 8 }} />
          <TextInput
            className="flex-1 text-base text-gray-800 h-full"
            placeholder="João Silva"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity className="bg-[#00C988] h-12 rounded-lg items-center justify-center mb-6">
          <Text className="text-white text-base font-medium">Buscar</Text>
        </TouchableOpacity>

        <Text className="text-sm text-gray-500 mb-4">
          {MOCK_DATA.length} empréstimo(s) encontrado(s)
        </Text>

        <FlatList
          data={MOCK_DATA}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, alignItems: 'center' }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <BookCardMobile 
              title={item.title} 
              category={item.category}
              status={item.status} 
              loanDate={item.loanDate} 
              dueDate={item.dueDate} 
            />
          )}
        />

      </View>
    </View>
  );
}