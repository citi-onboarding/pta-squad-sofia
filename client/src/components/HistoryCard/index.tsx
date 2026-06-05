"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Loan } from "@/types/Loan";
import { statusMap } from "@/utils/dictionaries";

interface HistoryCardProps {
    loan: Loan;
    onReturn: (loanId: string) => void;
}

export default function HistoryCard({ loan, onReturn }: HistoryCardProps) {
    const [sendingReminder, setSendingReminder] = useState(false);

    async function markAsReturned() {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/emprestimos/${loan.id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "DEVOLVIDO" }),
                }
            );

            if (!response.ok) {
                const err = await response.json();
                console.error("Erro backend:", err);
                return;
            }

            alert("Devolução registrada!");

            onReturn(loan.id);

        } catch (error) {
            console.error(error);
        }
    }

    async function sendReminder() {
        try {
            setSendingReminder(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/send-reminder`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customerEmail: loan.customerEmail,
                        customerName: loan.customerName,
                        dueDate: loan.dueDate,
                        bookTitle: loan.book.title,
                    }),
                }
            );

            if (response.ok) {
                alert("Lembrete enviado!");
            }

        } catch (error) {
            console.error(error);
        } finally {
            setSendingReminder(false);
        }
    }

    const statusStyles: Record<string, string> = {
        EM_ANDAMENTO: "border-[#FFDF20] bg-[#FEF9C2] text-[#A65F00]",
        ATRASADO: "border-[#EF44444D] bg-[#EF444433] text-[#EF4444]",
        DEVOLVIDO: "border-[#00C3894D] bg-[#00C38933] text-[#00C389]"
    };

    const rentalDate = new Date(loan.rentalDate);
    const dueDate = new Date(loan.dueDate);

    return (
        <article className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-gray-200 bg-white p-4 sm:p-5 shadow-sm gap-4 w-full">
            
            <div className="flex flex-col gap-2 w-full overflow-hidden">

                <header className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 className="text-lg font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                        {loan.customerName}
                    </h2>

                    <span
                        className={`
                            rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap
                            ${statusStyles[loan.status]}
                        `}
                    >
                        {statusMap[loan.status]}
                    </span>
                </header>

                <p className="text-sm text-gray-500 truncate w-full">
                    {loan.customerEmail}
                </p>

                <footer className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm mt-1">
                    <div>
                        <span className="text-gray-500">Locação: </span>
                        <strong className="text-gray-900">
                            {rentalDate.toLocaleDateString("pt-BR")}
                        </strong>
                    </div>

                    <div>
                        <span className="text-gray-500">Previsão: </span>
                        <strong className="text-gray-900">
                            {dueDate.toLocaleDateString("pt-BR")}
                        </strong>
                    </div>
                </footer>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">

                {loan.status === "ATRASADO" && (
                    <button
                        type="button"
                        onClick={sendReminder}
                        disabled={sendingReminder}
                        className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg border border-[#00C389] px-4 py-2.5 text-[#00C389] transition-transform duration-100 hover:bg-emerald-50 active:scale-95"
                    >
                        <Mail size={18} />
                        {sendingReminder ? "Enviando..." : "Enviar lembrete"}
                    </button>
                )}

                {loan.status !== "DEVOLVIDO" && (
                    <button
                        type="button"
                        onClick={markAsReturned}
                        className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg bg-[#00C389] px-4 py-2.5 text-white transition-transform duration-100 hover:opacity-90 active:scale-95"
                    >
                        <Check size={18} />
                        Marcar devolução
                    </button>
                )}
            </div>
        </article>
    );
}