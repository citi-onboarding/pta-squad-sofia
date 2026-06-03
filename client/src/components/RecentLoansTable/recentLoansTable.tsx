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
    <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-6 shadow-md w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-4 sm:mb-6">
        Últimos Empréstimos
      </h2>

      <div className="overflow-x-auto w-full pb-2">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              <TableHead className="px-2 font-bold text-zinc-900 h-11 whitespace-nowrap text-xs sm:text-sm">
                Livro
              </TableHead>
              <TableHead className="px-2 font-bold text-zinc-900 h-11 whitespace-nowrap text-xs sm:text-sm">
                Cliente
              </TableHead>
              <TableHead className="px-2 font-bold text-zinc-900 h-11 whitespace-nowrap text-xs sm:text-sm">
                Locação
              </TableHead>
              <TableHead className="px-2 font-bold text-zinc-900 h-11 whitespace-nowrap text-xs sm:text-sm">
                Devolução
              </TableHead>
              <TableHead className="px-2 font-bold text-zinc-900 h-11 whitespace-nowrap text-xs sm:text-sm">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {loans.map((loan) => (
              <TableRow 
                key={loan.id} 
                className="hover:bg-zinc-50/50 border-b border-gray-100 transition-colors duration-200"
              >
                <TableCell 
                  className="px-2 py-3 font-medium text-zinc-700 text-xs sm:text-sm max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[500px] xl:max-w-[600px] truncate" 
                  title={loan.bookTitle}
                >
                  {loan.bookTitle}
                </TableCell>
                
                <TableCell 
                  className="px-2 py-3 text-zinc-600 text-xs sm:text-sm max-w-[80px] sm:max-w-[150px] md:max-w-[250px] lg:max-w-none truncate" 
                  title={loan.clientName}
                >
                  {loan.clientName}
                </TableCell>
                
                <TableCell className="px-2 py-3 text-zinc-600 text-xs sm:text-sm whitespace-nowrap">
                  {formatDate(loan.rentalDate)}
                </TableCell>
                
                <TableCell className="px-2 py-3 text-zinc-600 text-xs sm:text-sm whitespace-nowrap">
                  {formatDate(loan.returnDate)}
                </TableCell>
                
                <TableCell className="px-2 py-3 whitespace-nowrap">
                  <Badge 
                    variant="outline" 
                    className={`rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium border ${statusConfig[loan.status].className}`}
                  >
                    {statusConfig[loan.status].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}