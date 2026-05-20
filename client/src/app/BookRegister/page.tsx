"use client";

import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BookButton from "@/components/BookButton";

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, submitCount },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      isbn: "",
      year: undefined,
      author: "",
      publisher: "",
      quantity: undefined,
      category: "",
    },
    resolver: yupResolver(schema),
  });

  const selectedCategory = watch("category");

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <>
      <Header />

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
          {/* Grid principal */}
          <div className="grid grid-cols-2 gap-6">
            {/* Coluna 1 */}
            <div className="grid grid-rows-3 gap-6">
              {/* Título */}
              <div>
                <label className="font-medium">Título</label>

                <input
                  {...register("title")}
                  type="text"
                  placeholder="Digite o título do livro"
                  className="mt-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
                />

                {errors.title && (
                  <span
                    key={submitCount}
                    className="animate-shake mt-1 block text-sm text-red-500"
                  >
                    {errors.title.message as string}
                  </span>
                )}
              </div>

              {/* ISBN */}
              <div>
                <label className="font-medium">ISBN</label>

                <input
                  {...register("isbn")}
                  type="text"
                  placeholder="Digite o ISBN"
                  className="mt-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
                />

                {errors.isbn && (
                  <span
                    key={submitCount}
                    className="animate-shake mt-1 block text-sm text-red-500"
                  >
                    {errors.isbn.message as string}
                  </span>
                )}
              </div>

              {/* Ano */}
              <div>
                <label className="font-medium">Ano</label>

                <input
                  {...register("year", { valueAsNumber: true })}
                  type="number"
                  placeholder="Digite o ano"
                  className="mt-2 pr-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
                />

                {errors.year && (
                  <span
                    key={submitCount}
                    className="animate-shake mt-1 block text-sm text-red-500"
                  >
                    {errors.year.message as string}
                  </span>
                )}
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="grid grid-rows-3 gap-6">
              {/* Autor */}
              <div>
                <label className="font-medium">Autor</label>

                <input
                  {...register("author")}
                  type="text"
                  placeholder="Digite o nome do autor"
                  className="mt-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
                />

                {errors.author && (
                  <span
                    key={submitCount}
                    className="animate-shake mt-1 block text-sm text-red-500"
                  >
                    {errors.author.message as string}
                  </span>
                )}
              </div>

              {/* Editora */}
              <div>
                <label className="font-medium">Editora</label>

                <input
                  {...register("publisher")}
                  type="text"
                  placeholder="Digite a editora"
                  className="mt-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
                />

                {errors.publisher && (
                  <span
                    key={submitCount}
                    className="animate-shake mt-1 block text-sm text-red-500"
                  >
                    {errors.publisher.message as string}
                  </span>
                )}
              </div>

              {/* Quantidade */}
              <div>
                <label className="font-medium">Quantidade</label>

                <input
                  {...register("quantity", { valueAsNumber: true })}
                  type="number"
                  placeholder="Digite a quantidade"
                  className="mt-2 pr-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
                />

                {errors.quantity && (
                  <span
                    key={submitCount}
                    className="animate-shake mt-1 block text-sm text-red-500"
                  >
                    {errors.quantity.message as string}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Categoria */}
          <div className="border-t">
            <p className="mt-6 font-medium">Categoria</p>

            <div className="mt-4 grid grid-cols-5 gap-4">
              <input type="hidden" {...register("category")} />

              <BookButton
                category="Tecnologia"
                selected={selectedCategory === "Tecnologia"}
                onClick={() =>
                  setValue("category", "Tecnologia", {
                    shouldValidate: true,
                  })
                }
              />

              <BookButton
                category="Infantil"
                selected={selectedCategory === "Infantil"}
                onClick={() =>
                  setValue("category", "Infantil", {
                    shouldValidate: true,
                  })
                }
              />

              <BookButton
                category="Romance"
                selected={selectedCategory === "Romance"}
                onClick={() =>
                  setValue("category", "Romance", {
                    shouldValidate: true,
                  })
                }
              />

              <BookButton
                category="História"
                selected={selectedCategory === "História"}
                onClick={() =>
                  setValue("category", "História", {
                    shouldValidate: true,
                  })
                }
              />

              <BookButton
                category="Ciências"
                selected={selectedCategory === "Ciências"}
                onClick={() =>
                  setValue("category", "Ciências", {
                    shouldValidate: true,
                  })
                }
              />

              {errors.category && (
                <span
                  key={submitCount}
                  className="animate-shake col-span-5 mt-1 block text-sm text-red-500"
                >
                  {errors.category.message as string}
                </span>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-4 border-t">
            <button
              type="button"
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