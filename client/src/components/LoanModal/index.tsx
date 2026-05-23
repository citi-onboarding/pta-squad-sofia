"use client";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface BookProps {
  title: string;
  author: string;
  category: string;
  stock: number;
}

interface LoanFormData {
  name: string;
  email: string;
  locationDate: Date;
  devolutionDate: Date;
}

interface LoanProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockBook: BookProps = {
  title: "O Pequeno Príncipe",
  author: "Antoine de Saint-Exupéry",
  category: "Infantil",
  stock: 8
};

const schema = yup.object({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O campo email é obrigatório"),
  locationDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Insira uma data válida")
    .required("Insira uma data de locação")
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "A locação não pode ser no passado"),
  devolutionDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Insira uma data válida")
    .required("Insira uma data de devolução")
    .min(yup.ref("locationDate"), "A devolução deve ser após a data de locação")
}).required();


export default function LoanModal({ isOpen, onClose }: LoanProps) {
  if (!isOpen) return null;

  const { register, handleSubmit, formState: { errors } } = useForm<LoanFormData>({
    defaultValues: {
      name: "",
      email: "",
      locationDate: new Date(),
      devolutionDate: new Date()
    },
    resolver: yupResolver(schema)
  });

  function onSubmit(data: LoanFormData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96 bg-white rounded-lg">

      {/* Cabeçalho do formulário */}
      <header className="flex items-center p-6 gap-[136px] border-b">
        <h1 className="font-medium text-xl leading-7.5 whitespace-nowrap">Realizar Empréstimo</h1>
        <button 
        type="button"
        onClick={onClose}>
          <X size={24} />
        </button>
      </header>

      {/* Corpo do formulário */}
      <div className="flex flex-col p-6 gap-6 font-medium leading-6 text-basetext-zinc-900 border-b">
        <div className="p-4 bg-slate-50 rounded-s-lg">
          <p className="font-normal text-sm leading-5 text-zinc-500">Livro selecionado</p>
          <h2 className="font-normal">{mockBook.title}</h2>
        </div>
        
        {/* Campos do formulário */}
        <div className="flex flex-col gap-2">

          {/* Campo de nome do cliente */}
          <label>Nome do Cliente</label>
          <input 
            {...register("name")} 
            type="text" 
            placeholder="Digite o nome do cliente" 
            className={`py-3 pl-4 border rounded-lg font-normal transition-colors ${errors.name ? "border-red-500" : "border-slate-200"}`}
          />
          {errors.name && (
            <span className="mt-1 text-red-500 text-sm animate-shake">
              {errors.name?.message as string}
            </span>
          )}
        </div>
        
        {/* Campo de email do cliente */}
        <div className="flex flex-col gap-2">
          <label>Email do Cliente</label>
          <input 
            {...register("email")} 
            type="email" 
            placeholder="Digite o email do cliente" 
            className={`py-3 pl-4 border rounded-lg font-normal transition-colors ${errors.email ? "border-red-500" : "border-slate-200"}`}
          />
          {errors.email && (
            <span className="mt-1 text-red-500 text-sm animate-shake">
              {errors.email?.message as string}
            </span>
          )}
        </div>

        {/* Campos de data */}
        <div className="flex flex-col gap-2">

          {/* Campo de data de locação */}
          <label>Data da Locação</label>
          <input 
            {...register("locationDate")} 
            type="date" 
            className={`py-3 pl-4 pr-2 border rounded-lg font-normal transition-colors ${errors.locationDate ? "border-red-500" : "border-slate-200"}`}
          />
          {errors.locationDate && (
            <span className="mt-1 text-red-500 text-sm animate-shake">
              {errors.locationDate?.message as string}
            </span>
          )}
        </div>

        {/* Campo de data prevista de devolução */}
        <div className="flex flex-col gap-2">
          <label>Data Prevista de Devolução</label>
          <input 
            {...register("devolutionDate")} 
            type="date" 
            className={`py-3 pl-4 pr-2 border rounded-lg font-normal transition-colors ${errors.devolutionDate ? "border-red-500" : "border-slate-200"}`}
          />
          {errors.devolutionDate && (
            <span className="mt-1 text-red-500 text-sm animate-shake">
              {errors.devolutionDate?.message as string}
            </span>
          )}
        </div>
      </div>

      {/* Rodapé do formulário */}
      <footer className="flex p-6 gap-4 font-medium text-base leading-6">
        <button 
          onClick={onClose}
          type="button" 
          className="w-28 h-12 border-[1.67px] border-[rgba(0,195,137,1)] rounded-lg text-[rgba(0,195,137,1)] cursor-pointer transition-all duration-200 hover:bg-[rgba(0,195,137,0.08)] hover:shadow-md active:scale-95 active:bg-[rgba(0,195,137,0.15)]"
        >
          Cancelar
        </button>  
        <button 
          type="submit" 
          className="w-52 bg-[rgba(0,195,137,1)] rounded-lg text-white cursor-pointer transition-all hover:bg-[rgba(0,175,127,1)] hover:shadow-md active:brightness-90"
        >
          Confirmar Empréstimo
        </button>
      </footer>
    </form>
  );
}