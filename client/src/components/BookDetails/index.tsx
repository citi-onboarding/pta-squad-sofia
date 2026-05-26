"use client";
import { useEffect, useState } from "react";
import HistoryCard from "../HistoryCard";
import { X } from "lucide-react";
import { Book } from "@/types/Book";
import { Loan } from "@/types/Loan"

import imgTecnologia from '../../assets/images/Tecnologia.png';
import imgInfantil from '../../assets/images/Infantil.png';
import imgRomance from '../../assets/images/Romance.png';
import imgHistoria from '../../assets/images/Historia.png';
import imgCiencias from '../../assets/images/Ciencias.png';

const categoryImages: Record<string, { src: string }> = {
    "TECNOLOGIA": imgTecnologia,
    "INFANTIL": imgInfantil,
    "ROMANCE": imgRomance,
    "HISTÓRIA": imgHistoria,
    "CIÊNCIAS": imgCiencias,
};


interface BookDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book | null;
}

export default function BookDetails({ isOpen, onClose, book}: BookDetailsProps) {
    const [ loans, setLoans ] = useState<Loan[]>([]);
    const [bookDetails, setBookDetails] = useState<Book | null>(book);

    useEffect(() => {
        async function fetchLoans() {
            try {
            const response = await fetch("http://localhost:3001/emprestimos"); 
            const data = await response.json();
            setLoans(Array.isArray(data) ? data : data.emprestimos ?? []);
            } catch (error) {
            console.error("Erro ao buscar empréstimos:", error);
            } 
        }

        fetchLoans();
        setBookDetails(book);
    }, [book]);

            async function handleReturnLoan(loanId: string) {
            try {

                const response = await fetch(
                    `http://localhost:3001/emprestimos/${loanId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            status: "DEVOLVIDO"
                        }),
                    }
                );

                if (response.ok) {

                    setLoans((prevLoans) =>
                        prevLoans.map((loan) =>
                            loan.id === loanId
                                ? { ...loan, status: "DEVOLVIDO" }
                                : loan
                        )
                    );

                    await refreshBookData();
                }

            } catch (error) {
                console.error(error);
            }
        }

    async function refreshBookData() {
        if (!bookDetails) return;

        try {

            const response = await fetch(
                `http://localhost:3001/livros/${bookDetails.id}`
            );

            const updatedBook = await response.json();

            setBookDetails(updatedBook);

        } catch (error) {
            console.error(error);
        }
    }


    if (!isOpen || !bookDetails) return null;

    const filteredLoans = loans.filter(
        (loan) => loan.bookId === bookDetails.id
    );

    const categoryImage = categoryImages[bookDetails.category] ?? imgTecnologia;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-16">
            <div className="flex w-full max-w-4xl max-h-full flex-col gap-6 overflow-y-auto rounded-lg border border-gray-200 bg-white p-8 shadow-sm">

                {/* Header */}
                <header className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h1 className="text-xl font-semibold text-gray-900">Detalhes do livro</h1>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-500 transition-transform duration-100 hover:bg-gray-100 active:scale-95">
                        <X size={24}/>
                    </button>
                </header>

                {/* Book Informations */}
                <section className="flex gap-8">
                    <img
                        src={categoryImage.src}
                        alt={bookDetails.category}
                        className="h-32 w-24 flex-shrink-0 rounded-lg object-cover"
                    />

                    <div className="flex w-full flex-col gap-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">{bookDetails.title}</h2>
                            <p className="text-gray-500">{bookDetails.author}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-500">ISBN</p>
                                <p className="font-medium text-gray-900">{bookDetails.isbn}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Categoria</p>
                                <p className="font-medium text-[#00C389]">{bookDetails.category}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Editora</p>
                                <p className="font-medium text-gray-900">{bookDetails.publisher}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Ano</p>
                                <p className="font-medium text-gray-900">{bookDetails.year}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Quantidade Total</p>
                                <p className="font-medium text-gray-900">{bookDetails.totalQuantity} unidades</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Quantidade Disponível</p>
                                <p className="font-medium text-[#00C389]">{bookDetails.availableQuantity} unidades</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-2 h-px w-full bg-gray-100"></div>

                {/* History section */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Histórico de Empréstimos</h3>
                    {filteredLoans.length > 0 ? (
                        <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-2">
                            {filteredLoans.map((loan: Loan) => {
                                return (
                                    <HistoryCard
                                        key={loan.id}
                                        loan={loan}
                                        onReturn={handleReturnLoan}
                                    />
                                );
                            })}
                        </div>
                    ) : (   
                        <p className="text-gray-500">Nenhum histórico de empréstimos encontrado.</p>
                    )}
                </section>
            </div>
        </div>
    )

}