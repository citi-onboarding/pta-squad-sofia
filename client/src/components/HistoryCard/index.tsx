import { Mail } from "lucide-react";

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

    const today = new Date();

    const dueDateObject = new Date(dueDate);

    let calculatedStatus = status;

    if (today > dueDateObject && status !== "Devolvido") {
      calculatedStatus = "Atrasado";
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
            ${statusStyles[calculatedStatus]}`}
          >
            {calculatedStatus}
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
      {calculatedStatus === "Atrasado" && (
        <button className="flex items-center gap-2 rounded-lg border border-[#00C389] px-5 py-3 text-[#00C389] hover:bg-emerald-50 transition-transform duration-100 active:scale-95">
            {/* Icone de um envelope simulando o do figma*/}
            <Mail
              color="#00C389" size={18} strokeWidth={1.5}
            />
          Enviar Lembrete
        </button>
      )}
    </article>
    )
}