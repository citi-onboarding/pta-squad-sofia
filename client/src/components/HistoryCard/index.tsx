interface HistoryCardProps {
    name: string;
    status: "Em andamento" | "Atrasado" | "Devolvido";
    email: string;
    rentalDate: string;
    dueDate: string; 
}

export default function HistoryCard({ name, status, email, rentalDate, dueDate }: HistoryCardProps) {
    const statusStyles = {
        "Em andamento": "border-[#FFDF20] bg-[#FEF9C2] text-[#A65F00]",
        "Atrasado": "border-[#EF44444D] bg-[#EF444433] text-[#EF4444]",
        "Devolvido": "border-[#00C3894D] bg-[#00C38933] text-[#00C389]"
    }

    return (
        <article className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm">

      {/* Conteúdo */}
      <div className="flex flex-col gap-3">

        {/* Header */}
        <header className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-gray-900">
            {name}
          </h2>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium
            ${statusStyles[status]}`}
          >
            {status}
          </span>
        </header>

        {/* Contato */}
        <p className="text-sm text-gray-500">
          {email}
        </p>

        {/* Datas */}
        <footer className="flex items-center gap-4 text-sm">
          <div className="text-gray-500">
            <span>Locação: </span>

            <strong className="font-medium text-gray-900">
              {rentalDate}
            </strong>
          </div>

          <div className="text-gray-500">
            <span>Previsão: </span>

            <strong className="font-medium text-gray-900">
              {dueDate}
            </strong>
          </div>
        </footer>
      </div>

      {/* Botão */}
      {status === "Atrasado" && (
        <button className="flex items-center gap-2 rounded-lg border border-[#00C389] px-5 py-3 text-[#00C389] hover:bg-emerald-50 transition">
            {/* SVG de um envelope simulando o icone do figma*/}
            <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          Enviar Lembrete
        </button>
      )}
    </article>
    )
}