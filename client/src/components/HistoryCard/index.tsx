"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";

interface HistoryCardProps {
    name: string;
    email: string;
    rentalDate: string;
    dueDate: string;
}

export default function HistoryCard({name, email, rentalDate, dueDate}: HistoryCardProps) {

    const [isReturned, setIsReturned] = useState(false);

    const statusStyles = {
        "Em andamento": "border-[#FFDF20] bg-[#FEF9C2] text-[#A65F00]",
        "Atrasado": "border-[#EF44444D] bg-[#EF444433] text-[#EF4444]",
        "Devolvido": "border-[#00C3894D] bg-[#00C38933] text-[#00C389]"
    };

    const [day, month, year] = dueDate.split("/");

    const dueDateObject = new Date(Number(year), Number(month) - 1, Number(day));

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let calculatedStatus: "Em andamento" | "Atrasado" | "Devolvido" = "Em andamento";

    if (isReturned) {
        calculatedStatus = "Devolvido";
    }
    else if (today > dueDateObject) {
        calculatedStatus = "Atrasado";
    }

    return (
        <article className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3">

                {/* Header */}
                <header className="flex items-center gap-3">
                    <h2 className="text-lg font-medium text-gray-900">
                        {name}
                    </h2>
                    <span className={`
                        rounded-full border px-3 py-1 text-xs font-medium
                        ${statusStyles[calculatedStatus]}
                    `}>
                        {calculatedStatus}
                    </span>
                </header>
                <p className="text-sm text-gray-500">
                    {email}
                </p>
                <footer className="flex items-center gap-4 text-sm">

                    <div>
                        <span>Locação: </span>
                        <strong>{rentalDate}</strong>
                    </div>

                    <div>
                        <span>Previsão: </span>
                        <strong>{dueDate}</strong>
                    </div>
                </footer>
            </div>
            <div className="flex gap-3">

                {calculatedStatus === "Atrasado" && (
                    <button className="flex items-center gap-2 rounded-lg border border-[#00C389] px-5 py-3 text-[#00C389] hover:bg-emerald-50 transition-transform duration-100 active:scale-95">
                        {/* Icone de um envelope simulando o do figma */}
                        <Mail size={18} />
                        Enviar Lembrete
                    </button>
                )}

                {!isReturned && (
                    <button
                        onClick={() => setIsReturned(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#00C389] px-5 py-3 text-white hover:opacity-90 transition-transform duration-100 active:scale-95"
                    >
                        <Check size={18} />
                        Marcar devolução
                    </button>
                )}
            </div>
        </article>
    );
}