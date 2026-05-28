import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { BookCardMobile } from "../src/components/BookCardMobile"; 

const App: React.FC = () => (
  <SafeAreaView className="flex-1 bg-gray-50">
    <ScrollView 
      className="flex-1" 
      contentContainerStyle={{ alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full items-center gap-4">
        
        {/* test card 1: returned */}
        <BookCardMobile 
          title="Dom Casmurro" 
          category="romance"
          status="RETURNED" 
          loanDate="02/03/2026" 
          dueDate="12/03/2026" 
        />

        {/* test card 2: in progress */}
        <BookCardMobile 
          title="Clean Code" 
          category="tecnologia"
          status="IN_PROGRESS" 
          loanDate="15/04/2026" 
          dueDate="30/04/2026" 
        />

        {/* test card 3: overdue */}
        <BookCardMobile 
          title="História do Brasil" 
          category="historia"
          status="OVERDUE" 
          loanDate="01/03/2026" 
          dueDate="10/03/2026" 
        />

        {/* test card 4: in progress */}
        <BookCardMobile 
          title="Introdução à Ciência" 
          category="ciencias"
          status="IN_PROGRESS" 
          loanDate="20/04/2026" 
          dueDate="05/05/2026" 
        />

        {/* test card 5: returned */}
        <BookCardMobile 
          title="O Pequeno Príncipe" 
          category="infantil"
          status="RETURNED" 
          loanDate="10/03/2026" 
          dueDate="20/03/2026" 
        />
        
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default App;