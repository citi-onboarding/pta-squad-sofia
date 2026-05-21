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
    className: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-50",
  },
  ATRASADO: {
    label: "Atrasado",
    className: "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-50",
  },
  DEVOLVIDO: {
    label: "Devolvido",
    className: "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-50",
  },
}

interface RecentLoansTableProps {
  loans: Loan[]
}

export function RecentLoansTable({ loans }: RecentLoansTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4">
        Últimos Empréstimos
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-zinc-900">Livro</TableHead>
            <TableHead className="font-bold text-zinc-900">Cliente</TableHead>
            <TableHead className="font-bold text-zinc-900">Data de Locação</TableHead>
            <TableHead className="font-bold text-zinc-900">Data de Devolução</TableHead>
            <TableHead className="font-bold text-zinc-900">Status</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id} className="hover:bg-zinc-50/50">
              <TableCell className="font-medium text-zinc-700">{loan.bookTitle}</TableCell>
              <TableCell className="text-zinc-600">{loan.clientName}</TableCell>
              <TableCell className="text-zinc-600">{formatDate(loan.rentalDate)}</TableCell>
              <TableCell className="text-zinc-600">{formatDate(loan.returnDate)}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`rounded-full px-3 py-1 text-xs font-medium border ${statusConfig[loan.status].className}`}
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