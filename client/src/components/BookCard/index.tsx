"use client";
import { Eye, Trash2, Bookmark } from 'lucide-react';
import { Book } from "@/types/Book";

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
    <article className="flex flex-col gap-6 w-[394.67px] p-4 bg-white shadow-lg rounded-lg">
      {/* Imagem do livro */}
      <img 
        className="w-full h-auto rounded-md bg-gray-200"
        src={imageSource.src}
        alt={`Capa do livro ${title}`}
        /> 

      {/* Informações do livro */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[rgba(30,30,30,1)] text-lg font-medium leading-6.75">{title}</h2>
        <p className="text-[rgba(113,113,130,1)] text-base leading-6">{author}</p>
        <p className="text-[rgba(0,195,137,1)] text-sm font-bold leading-5">{category}</p>
        <p className="text-[rgba(30,30,30,1)] text-sm leading-5">
          <span className="font-medium">Disponível: </span> {availableQuantity} unidade(s)
        </p>
      </div>

        {/* Botões */}
      <div className="grid grid-cols-[115px_147px_66px] gap-2">
        <button 
          onClick={onClick}
          className="flex items-center justify-center gap-[7px] w-28.75 h-[47.33px] bg-transparent border-[1.67px] border-solid border-[rgba(0,195,137,1)] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,195,137,0.08)] hover:shadow-md active:scale-95 active:bg-[rgba(0,195,137,0.15)]"> 
          <Eye  size={18} className="text-[rgba(0,195,137,1)]" />
          <span className="font-medium text-[rgba(0,195,137,1)] text-base leading-6">Ver</span>
        </button>
        <button
          onClick={onLoan}
          disabled={availableQuantity === 0}
          className={`flex items-center gap-[6px] justify-center w-36.75 h-[47.33px] rounded-lg 
            transition-all duration-200 active:scale-95
            ${availableQuantity === 0 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-[rgba(0,195,137,1)] cursor-pointer hover:bg-[rgba(0,175,127,1)] hover:shadow-md active:brightness-90"
            }`}
        >
          <Bookmark size={18} className="text-white" />
          <span className="font-medium text-white text-base leading-6">
            {availableQuantity === 0 ? "Esgotado" : "Emprestar"}
          </span>
        </button>
        <button 
          onClick={() => onDecrement(book.id)}
          className="flex items-center justify-center  w-16.5 h-[47.33px] bg-[rgba(239,68,68,1)] rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-90 active:brightness-90">
          <Trash2 size={18} className="text-[rgba(255,255,255,1)]" />
        </button>
      </div>
    </article>
  );
}

  
