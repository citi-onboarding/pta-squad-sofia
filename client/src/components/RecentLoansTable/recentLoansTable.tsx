import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Loan {
  id: string
  bookTitle: string
  clientName: string
  rentalDate: string
  returnDate: string
  status: "EM_ANDAMENTO" | "ATRASADO" | "DEVOLVIDO"
}

const statusConfig = {
  EM_ANDAMENTO: {
    label: "Em andamento",
    className: "border-[#FFDF20] bg-[#FEF9C2] text-[#A65F00] hover:bg-[#FEF9C2]",
  },
  ATRASADO: {
    label: "Atrasado",
    className: "border-[#EF44444D] bg-[#EF444433] text-[#EF4444] hover:bg-[#EF444433]",
  },
  DEVOLVIDO: {
    label: "Devolvido",
    className: "border-[#00C3894D] bg-[#00C38933] text-[#00C389] hover:bg-[#00C38933]",
  },
}

interface RecentLoansTableProps {
  loans: Loan[]
}

export function RecentLoansTable({ loans }: RecentLoansTableProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    } catch {
      return dateString;
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-zinc-900 mb-6">
        Últimos Empréstimos
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-100">
            <TableHead className="font-bold text-zinc-900 h-11">Livro</TableHead>
            <TableHead className="font-bold text-zinc-900 h-11">Cliente</TableHead>
            <TableHead className="font-bold text-zinc-900 h-11">Data de Locação</TableHead>
            <TableHead className="font-bold text-zinc-900 h-11">Data de Devolução</TableHead>
            <TableHead className="font-bold text-zinc-900 h-11">Status</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {loans.map((loan) => (
            <TableRow 
              key={loan.id} 
              className="hover:bg-zinc-50/50 border-b border-gray-100 transition-colors duration-200"
            >
              <TableCell className="font-medium text-zinc-700 py-4">{loan.bookTitle}</TableCell>
              <TableCell className="text-zinc-600 py-4">{loan.clientName}</TableCell>
              <TableCell className="text-zinc-600 py-4">{formatDate(loan.rentalDate)}</TableCell>
              <TableCell className="text-zinc-600 py-4">{formatDate(loan.returnDate)}</TableCell>
              <TableCell className="py-4">
                <Badge 
                  variant="outline" 
                  className={`rounded-full px-3 py-1 text-xs font-medium border whitespace-nowrap ${statusConfig[loan.status].className}`}
                >
                  {statusConfig[loan.status].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}