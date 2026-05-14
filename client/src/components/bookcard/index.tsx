import React from 'react';
import { Eye, Trash2, Bookmark } from 'lucide-react';

interface BookCardProps {
  title: string;
  author: string;
  category: string;
  stock: number;
  imageUrl: string;
}


export const BOOKS_MOCK: BookCardProps[] = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Tecnologia",
    stock: 5,
    imageUrl: "/images/Tecnologia.png"
  },
  {
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    category: "Infantil",
    stock: 0,
    imageUrl: "images/Infantil.png"
  },
  {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    category: "Romance",
    stock: 3,
    imageUrl: "/images/Romance.png"
  }, 
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "História",
    stock: 6,
    imageUrl: "images/Historia.png"
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Ciências",
    stock: 4,
    imageUrl: "images/Ciencias.png"
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Romance",
    stock: 7,
    imageUrl: "images/Romance.png"
  }
];

export default function BookCard({ title, author, category, stock, imageUrl }: BookCardProps) {
    return (
      <article className="flex flex-col gap-6  w-98.5 p-4 bg-white shadow-lg rounded-lg">
          {/* Imagem do livro */}
          <img 
            className="w-full h-64 object-cover rounded-md bg-gray-200"
            src={imageUrl}
            alt={`Capa do livro ${title}`}
           /> 

           {/* Informações do livro */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[rgba(30,30,30,1)] text-lg font-medium leading-6.75">{title}</h2>
            <p className="text-[rgba(113,113,130,1)] text-base leading-6">{author}</p>
            <p className="text-[rgba(0,195,137,1)] text-sm font-bold leading-5">{category}</p>
            <p className="text-[rgba(30,30,30,1)] text-sm leading-5">
              <span className="font-medium">Disponível: </span> {stock} unidade(s)
            </p>
          </div>

          {/* Botões */}
        <div className="grid grid-cols-[115px_147px_66px] gap-2">
          <button  className="flex items-center justify-center gap-[7px] w-28.75 h-[47.33px] bg-transparent border-[1.67px] border-solid border-[rgba(0,195,137,1)] rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm active:scale-95 active:bg-[rgba(0,195,137,0.15)]">  
            <Eye  size={18} className="text-[rgba(0,195,137,1)]" />
            <span className="font-medium text-[rgba(0,195,137,1)] text-base leading-6">Ver</span>
          </button>
          <button 
            disabled={stock === 0}
            className={`flex items-center gap-[6px] justify-center w-36.75 h-[47.33px] rounded-lg 
              transition-all duration-200 active:scale-95
              ${stock === 0 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[rgba(0,195,137,1)] cursor-pointer hover:bg-[rgba(0,175,127,1)] hover:shadow-md active:brightness-90"
              }`}
          >
            <Bookmark size={18} className="text-white" />
            <span className="font-medium text-white text-base leading-6">
              {stock === 0 ? "Esgotado" : "Emprestar"}
            </span>
          </button>
          <button className="flex items-center justify-center  w-16.5 h-[47.33px] bg-[rgba(239,68,68,1)] rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-90 active:brightness-90">
            <Trash2 size={18} className="text-[rgba(255,255,255,1)]" />
          </button>
        </div>
      </article>
    );
  }
  
  
