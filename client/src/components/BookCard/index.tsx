"use client";
import { Eye, Trash2, Bookmark } from 'lucide-react';
import { Book } from "@/types/Book";
import { categoryMap } from "@/utils/dictionaries";

import imgTecnologia from '../../assets/images/Tecnologia.png';
import imgInfantil from '../../assets/images/Infantil.png';
import imgRomance from '../../assets/images/Romance.png';
import imgHistoria from '../../assets/images/Historia.png';
import imgCiencias from '../../assets/images/Ciencias.png';

interface BookCardProps {
  book: Book;
  onClick: () => void;
  onDecrement: (id: string) => void;
  onLoan: () => void;
}

export default function BookCard({ book, onClick, onDecrement, onLoan }: BookCardProps) {
  const title = book.title || (book as any).titulo;
  const author = book.author || (book as any).autor;
  const category = book.category || (book as any).categoria || "";
  const availableQuantity = book.availableQuantity ?? (book as any).quantidadeDisponivel ?? 0;
  
  const formattedCategory = categoryMap[category.toUpperCase()] || category;

  const normalizedCategory = category.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let imageSource;
  if (normalizedCategory === "tecnologia") {
      imageSource = imgTecnologia;
  } else if (normalizedCategory === "infantil") {
    imageSource = imgInfantil;
  } else if (normalizedCategory === "romance") {
    imageSource = imgRomance;
  } else if (normalizedCategory === "historia") {
    imageSource = imgHistoria;
  } else if (normalizedCategory === "ciencias") {
    imageSource = imgCiencias;
  } else {
    imageSource = imgTecnologia;
  }

  return (
    <article className="flex flex-col h-full w-full gap-4 rounded-lg bg-white p-4 shadow-lg">
      
      <img 
        className="w-full h-[240px] object-cover rounded-md"
        src={imageSource.src}
        alt={`Capa do livro ${title}`}
      /> 

      <div className="flex flex-col gap-1.5">
        <h2 className="text-[rgba(30,30,30,1)] text-base md:text-lg font-medium leading-tight line-clamp-2 min-h-[44px]">
          {title}
        </h2>
        <p className="text-[rgba(113,113,130,1)] text-sm leading-snug truncate">
          {author}
        </p>
        
        <p className="text-[rgba(0,195,137,1)] text-xs font-bold mt-1">
          {formattedCategory}
        </p>
        
        <p className="text-[rgba(30,30,30,1)] text-sm mt-1">
          <span className="font-medium">Disponível: </span> {availableQuantity} unid.
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-auto pt-2">
        
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center gap-2 h-[42px] bg-transparent border-[1.5px] border-solid border-[rgba(0,195,137,1)] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,195,137,0.08)] active:scale-95"
        >
          <Eye size={18} className="text-[rgba(0,195,137,1)] shrink-0" />
          <span className="font-medium text-[rgba(0,195,137,1)] text-sm truncate">Ver Detalhes</span>
        </button>

        <div className="flex w-full gap-2">
          <button
            onClick={onLoan}
            disabled={availableQuantity === 0}
            className={`flex flex-1 items-center justify-center gap-2 h-[42px] rounded-lg transition-all duration-200 active:scale-95
              ${availableQuantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[rgba(0,195,137,1)] cursor-pointer hover:bg-[rgba(0,175,127,1)] hover:shadow-md"
              }`}
          >
            <Bookmark size={18} className="text-white shrink-0" />
            <span className="font-medium text-white text-sm truncate">
              {availableQuantity === 0 ? "Esgotado" : "Emprestar"}
            </span>
          </button>
          
          <button
            onClick={() => onDecrement(book.id)}
            className="flex shrink-0 items-center justify-center w-[42px] h-[42px] bg-[rgba(239,68,68,1)] rounded-lg cursor-pointer transition-all duration-200 hover:brightness-90 active:scale-90"
          >
            <Trash2 size={18} className="text-white" />
          </button>
        </div>

      </div>
    </article>
  );
}