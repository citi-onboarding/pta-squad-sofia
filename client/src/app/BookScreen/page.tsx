"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import BookCard from "@/components/bookcard";
import { Search } from 'lucide-react';

const MOCK_BOOKS = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Tecnologia",
    availableQuantity: 5,
  },
  {
    id: "2",
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    category: "Infantil",
    availableQuantity: 8,
  },
  {
    id: "3",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    category: "Romance",
    availableQuantity: 3,
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "História",
    availableQuantity: 6,
  },
  {
    id: "5",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Ciências",
    availableQuantity: 4,
  },
  {
    id: "6",
    title: "1984",
    author: "George Orwell",
    category: "Romance",
    availableQuantity: 7,
  },
];

export default function BookScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <Header />

      <div className="max-w-[1280px] mx-auto px-6 pt-8">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Livros</h1>
          <p className="text-sm text-gray-500">Gerencie o acervo da biblioteca</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20}/>
            </span>
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00C389] focus:ring-1 focus:ring-[#00C389] shadow-sm transition-all"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-56 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#00C389] focus:ring-1 focus:ring-[#00C389] shadow-sm transition-all"
          >
            <option value="">Todas as categorias</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Infantil">Infantil</option>
            <option value="Romance">Romance</option>
            <option value="História">História</option>
            <option value="Ciências">Ciências</option>
          </select>
        </div>

        {/* Grid Cards*/}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.id}
                title={book.title}
                author={book.author}
                category={book.category}
                stock={book.availableQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum livro encontrado com os filtros aplicados.</p>
          </div>
        )}

      </div>
    </main>
  );
}