import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList 
} from "react-native";
import { Search } from "lucide-react-native";
import { BookCardMobile } from "../src/components/BookCardMobile";
import { Image } from "react-native";

const API_URL = "https://pta-squad-sofia.onrender.com/emprestimos";

type BookStatus = "RETURNED" | "IN_PROGRESS" | "OVERDUE";

interface Loan {
  id: string;
  customerName: string;
  customerEmail: string;
  rentalDate: string;
  dueDate: string;
  status: string;

  book: {
    id: string;
    title: string;
    author: string;
  };
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  async function fetchLoans() {
    try {
      const response = await fetch(
        `${API_URL}/emprestimos`
      );

      const data = await response.json();

      setLoans(data);
      setFilteredLoans(data);
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
    }
  }

  async function handleSearch() {
    if (!searchQuery.trim()) {
      setFilteredLoans(loans);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/emprestimos?cliente=${encodeURIComponent(searchQuery)}`
      );

      const data = await response.json();
      setFilteredLoans(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      
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

        <TouchableOpacity
          className="bg-[#00C988] h-12 rounded-lg items-center justify-center mb-6"
          onPress={handleSearch}
        >
          <Text className="text-white text-base font-medium">Buscar</Text>
        </TouchableOpacity>

        <Text className="text-sm text-gray-500 mb-4">
          {filteredLoans.length} empréstimo(s) encontrado(s)
        </Text>

        <FlatList
          data={filteredLoans}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, alignItems: 'center' }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <BookCardMobile
              title={item.book.title}
              category={item.book.author}
              status={
                item.status === "DEVOLVIDO"
                  ? "RETURNED"
                  : item.status === "ATRASADO"
                  ? "OVERDUE"
                  : "IN_PROGRESS"
              }
              loanDate={new Date(item.rentalDate).toLocaleDateString("pt-BR")}
              dueDate={new Date(item.dueDate).toLocaleDateString("pt-BR")}
            />
          )}
        />

      </View>
    </View>
  );
}