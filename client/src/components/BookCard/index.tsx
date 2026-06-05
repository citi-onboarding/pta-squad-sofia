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
    <article className="flex flex-col h-full w-full gap-6 rounded-lg bg-white p-4 shadow-lg">
      <img 
        className="w-full h-[340px] object-cover rounded-md"
        src={imageSource.src}
        alt={`Capa do livro ${title}`}
        /> 

      <div className="flex flex-col gap-2">
        <h2 className="text-[rgba(30,30,30,1)] text-lg font-medium leading-6.75 line-clamp-2 h-[54px]">{title}</h2>
        <p className="text-[rgba(113,113,130,1)] text-base leading-6">{author}</p>
        
        <p className="text-[rgba(0,195,137,1)] text-sm font-bold leading-5">{formattedCategory}</p>
        
        <p className="text-[rgba(30,30,30,1)] text-sm leading-5">
          <span className="font-medium">Disponível: </span> {availableQuantity} unidade(s)
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-auto md:flex-row">
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center gap-[7px] h-[47.33px] bg-transparent border-[1.67px] border-solid border-[rgba(0,195,137,1)] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,195,137,0.08)] hover:shadow-md active:scale-95 active:bg-[rgba(0,195,137,0.15)] md:w-auto md:grow-[115] md:basis-0 md:min-w-0">
          <Eye  size={18} className="text-[rgba(0,195,137,1)] shrink-0" />
          <span className="font-medium text-[rgba(0,195,137,1)] text-base leading-6 truncate">Ver</span>
        </button>
        <div className="flex w-full flex-row gap-2 md:w-auto md:grow-[147] md:basis-0 md:min-w-0">
          <button
            onClick={onLoan}
            disabled={availableQuantity === 0}
            className={`flex flex-1 min-w-0 items-center gap-[6px] justify-center h-[47.33px] rounded-lg
              transition-all duration-200 active:scale-95
              ${availableQuantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[rgba(0,195,137,1)] cursor-pointer hover:bg-[rgba(0,175,127,1)] hover:shadow-md active:brightness-90"
              }`}
          >
            <Bookmark size={18} className="text-white shrink-0" />
            <span className="font-medium text-white text-base leading-6 truncate">
              {availableQuantity === 0 ? "Esgotado" : "Emprestar"}
            </span>
          </button>
          <button
            onClick={() => onDecrement(book.id)}
            className="flex shrink-0 items-center justify-center w-[66px] h-[47.33px] bg-[rgba(239,68,68,1)] rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-90 active:brightness-90">
            <Trash2 size={18} className="text-[rgba(255,255,255,1)]" />
          </button>
        </div>
      </div>
    </article>
  );
}