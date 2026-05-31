"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Loan } from "@/types/Loan";

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
        <article className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3">

                {/* Header */}
                <header className="flex items-center gap-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        {loan.customerName}
                    </h2>

                    <span
                        className={`
                            rounded-full border px-3 py-1 text-xs font-medium
                            ${statusStyles[loan.status]}
                        `}
                    >
                        {loan.status}
                    </span>
                </header>

                <p className="text-sm text-gray-500">
                    {loan.customerEmail}
                </p>

                <footer className="flex items-center gap-4 text-sm">
                    <div>
                        <span>Locação: </span>
                        <strong>
                            {rentalDate.toLocaleDateString("pt-BR")}
                        </strong>
                    </div>

                    <div>
                        <span>Previsão: </span>
                        <strong>
                            {dueDate.toLocaleDateString("pt-BR")}
                        </strong>
                    </div>
                </footer>
            </div>

            <div className="flex gap-3">

                {loan.status === "ATRASADO" && (
                    <button
                        type="button"
                        onClick={sendReminder}
                        disabled={sendingReminder}
                        className="flex items-center gap-2 rounded-lg border border-[#00C389] px-5 py-3 text-[#00C389] transition-transform duration-100 hover:bg-emerald-50 active:scale-95"
                    >
                        <Mail size={18} />
                        {sendingReminder ? "Enviando..." : "Enviar Lembrete"}
                    </button>
                )}

                {loan.status !== "DEVOLVIDO" && (
                    <button
                        type="button"
                        onClick={markAsReturned}
                        className="flex items-center gap-2 rounded-lg bg-[#00C389] px-5 py-3 text-white transition-transform duration-100 hover:opacity-90 active:scale-95"
                    >
                        <Check size={18} />
                        Marcar devolução
                    </button>
                )}
            </div>
        </article>
    );
}