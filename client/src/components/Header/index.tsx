"use client"; 
import React, { useState } from 'react';
import Image from 'next/image'; 
import { LayoutDashboard, BookText, Plus, Menu, X } from 'lucide-react';
import { useRouter } from "next/navigation";

export function Header() {
  // controlar o menu no mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full bg-white border-b border-gray-200 relative z-50">
      <div className="flex items-center justify-between px-4 md:px-16 h-20">
        
        <div className="flex items-center gap-2 md:gap-4">
          <Image 
            src="/logoCITi.png" 
            alt="Logo CITi" 
            width={80} 
            height={40}
            priority
            className="object-contain w-14 md:w-[80px]" 
          />
          <h1 className="text-xl md:text-2xl text-gray-800 font-medium md:ml-2">
            Biblioteca Escolar
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8 text-gray-700">
            <a 
              href="#" 
              className="flex items-center gap-2 hover:text-[#58c08f] transition-colors group"
              onClick={() => router.push("/")}
            >
              <LayoutDashboard size={20} className="group-hover:text-[#58c08f]" />
              <span className="font-medium text-lg">Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[#58c08f] transition-colors group"
              onClick={() => router.push("/")}
            >
              <BookText size={20} className="group-hover:text-[#58c08f]" />
              <span className="font-medium text-lg">Livros</span>
            </a>
          </div>
          <button 
            className="bg-[#58c08f] hover:bg-[#4ab07f] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95"
            onClick={() => router.push("/BookRegister")}
          >
            <Plus size={20} />
            <span className="font-semibold text-lg">Novo Livro</span>
          </button>
        </nav>

        <button 
          className="md:hidden flex items-center text-gray-700 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 p-4 flex flex-col gap-4 shadow-lg">
          <a href="#" className="flex items-center gap-3 text-gray-700 p-2 hover:bg-gray-50 rounded-lg">
            <LayoutDashboard size={20} />
            <span className="font-medium text-lg">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 p-2 hover:bg-gray-50 rounded-lg">
            <BookText size={20} />
            <span className="font-medium text-lg">Livros</span>
          </a>
          
          <hr className="border-gray-200 my-1" />
          
          <button className="bg-[#58c08f] hover:bg-[#4ab07f] text-white w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
            <Plus size={20} />
            <span className="font-semibold text-lg">Novo Livro</span>
          </button>
        </div>
      )}
    </header>
  );
}