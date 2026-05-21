"use client";

import HistoryCard from "../HistoryCard";
import { X } from "lucide-react";

interface Book {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    category: string;
    year: number;
    totalQuantity: number;
    availableQuantity: number;
}

interface BookDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book | null;
}

export default function BookDetails({ isOpen, onClose, book}: BookDetailsProps) {
    if (!isOpen || !book) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4">
            <div className="flex w-full max-w-4xl flex-col gap-6 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                
                {/* Header */}
                <header className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h1 className="text-xl font-semibold text-gray-900">Detalhes do livro</h1>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-500 transition-transform duration-100 hover:bg-gray-100 active:scale-95">
                        <X size={24}/>
                    </button>
                </header>

                {/* Book Informations */}
                <section className="flex gap-8">
                    {/* Placeholder of image */}
                    <div className="h-32 w-24 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-50"></div>

                    <div className="flex w-full flex-col gap-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">{book.title}</h2>
                            <p className="text-gray-500">{book.author}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-500">ISBN</p>
                                <p className="font-medium text-gray-900">{book.isbn}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Categoria</p>
                                <p className="font-medium text-[#00C389]">{book.category}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Editora</p>
                                <p className="font-medium text-gray-900">{book.publisher}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Ano</p>
                                <p className="font-medium text-gray-900">{book.year}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Quantidade Total</p>
                                <p className="font-medium text-gray-900">{book.totalQuantity} unidades</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Quantidade Disponível</p>
                                <p className="font-medium text-[#00C389]">{book.availableQuantity} unidades</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-2 h-px w-full bg-gray-100"></div>

                {/* History section */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Histórico de Empréstimos</h3>
                    
                    <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-2">
                        <HistoryCard 
                        name="João Silva"
                        email="joao@email.com"
                        rentalDate="20/05/2026"
                        dueDate="27/05/2026"
                        />
                        <HistoryCard 
                        name="Maria Santos"
                        email="maria@email.com"
                        rentalDate="10/04/2026"
                        dueDate="17/04/2026"
                        />
                        <HistoryCard
                        name="Pedro Costa"
                        email="pedro@email.com"
                        rentalDate="05/04/2026"
                        dueDate="12/04/2026"
                        />
                    </div>
                </section>
            </div>
        </div>
    )

}