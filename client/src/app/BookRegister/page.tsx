"use client";

import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BookFormField from "@/components/BookRegisterComponents/BookFormField";
import BookCategorySelector from "@/components/BookRegisterComponents/BookCategorySelector";
import { useRouter } from "next/navigation";

const schema = yup.object({
  title: yup.string().required("*Este é um campo obrigatório"),

  isbn: yup
    .string()
    .required("*Este é um campo obrigatório")
    .matches(
      /^(?:\d{10}|\d{13})$/,
      "O ISBN deve possuir 10 ou 13 dígitos"
    ),

  year: yup
    .number()
    .typeError("Digite um ano válido")
    .required("*Este é um campo obrigatório"),

  author: yup.string().required("*Este é um campo obrigatório"),

  publisher: yup.string().required("*Este é um campo obrigatório"),

  quantity: yup
    .number()
    .typeError("Digite uma quantidade válida")
    .required("*Este é um campo obrigatório")
    .min(1, "A quantidade deve ser maior que 0"),

  category: yup.string().required("*Este é um campo obrigatório"),
});

type FormData = yup.InferType<typeof schema>;

export default function BookRegister() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, submitCount },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const selectedCategory = watch("category");

  
  async function onSubmit(data: FormData) {
    const formatedCategory = data.category
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();

    const newBook = {
      title: data.title,
      isbn: data.isbn,
      year: data.year,
      author: data.author,
      publisher: data.publisher,
      totalQuantity: data.quantity,
      category: formatedCategory,
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/livros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      })

      if (response.status === 201) {
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(`Erro ao salvar: ${errorData.message || "Verifique os dados"}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão. Verifique se o Back-end está rodando na porta 3001.");
    }
  }

  return (
    <>
      <main className="flex flex-col items-center gap-8">
        <div className="mt-8 w-[836px]">
          <h1 className="text-2xl font-medium leading-9">
            Cadastrar Novo Livro
          </h1>
          <p className="mt-2 text-[#717182]">
            Adicione um novo livro ao acervo
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mb-8 gap-8 rounded-lg bg-white p-6 shadow-md"
        >
          {/* Campo do formulário */}
          <BookFormField
            register={register}
            errors={errors}
            watch={watch}
            submitCount={submitCount}
          />

          {/* Categoria */}
          <BookCategorySelector
            register={register}
            setValue={setValue}
            selectedCategory={selectedCategory}
            errors={errors}
            submitCount={submitCount}
          />

          {/* Botões */}
          <div className="flex justify-end gap-4 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="mt-6 h-12 w-32 rounded-lg border-[2px] border-[#00C389] transition-all duration-200 hover:bg-[rgba(0,195,137,0.08)] hover:shadow-md active:scale-95 active:bg-[rgba(0,195,137,0.15)]"
            >
              <span className="font-medium text-[#00C389]">
                Cancelar
              </span>
            </button>

            <button
              type="submit"
              className="mt-6 h-12 w-32 rounded-lg bg-[#00C389] transition-all duration-200 hover:bg-[#00B07B] hover:shadow-md active:scale-95 active:bg-[#009966]"
            >
              <span className="font-medium text-white">
                Salvar Livro
              </span>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}