"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/Book"
import { Search } from 'lucide-react';

import BookCard from "@/components/BookCard";
import BookDetails from "@/components/BookDetails";
import LoanModal from "@/components/LoanModal";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

  const filteredBooks = books?.filter((book) => {
    const matchesSearch =
      (book.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.author ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  }) || [];
  
  useEffect(() => {
      async function fetchBooks() {
        try {
          const response = await fetch("http://localhost:3001/livros"); 
          const data = await response.json();
          setBooks(Array.isArray(data) ? data : data.livros ?? []);
        } catch (error) {
          console.error("Erro ao buscar livros:", error);
        } 
      }
      fetchBooks();
    }, []);

  async function decrementBook(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/livros/${id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === id
              ? {
                  ...book,
                  availableQuantity: Math.max(
                    (book.availableQuantity ?? 0) - 1,
                    0
                  ),
                }
              : book
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <main className="min-h-screen bg-gray-50 pb-12">
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
                book={book}
                onClick={() => {
                  setIsDetailsOpen(true);
                  setSelectedBook(book);
                }}
                onDecrement={decrementBook}
                onLoan={() => {
                  setIsLoanOpen(true);
                  setSelectedBook(book);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum livro encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>

      <BookDetails 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        book={selectedBook}
      />

      <LoanModal 
        isOpen={isLoanOpen}
        onClose={() => setIsLoanOpen(false)}
      />
    </main>
  );
}