import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form"
import BookInput from "../BookInput"

type FormData = {
  title: string
  isbn: string
  year: number
  author: string
  publisher: string
  quantity: number
  category: string
}

type BookFormFieldProps = {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
  submitCount: number
}

export default function BookFormField({
  register,
  errors,
  submitCount,
}: BookFormFieldProps) {

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Coluna 1 */}
      <div className="grid grid-rows-3 gap-6">

        {/* Título */}
        <BookInput
          name="title"
          label="Título"
          placeholder="Digite o título do livro"
          register={register}
          errors={errors}
          submitCount={submitCount}
        />

        {/* ISBN */}
        <BookInput
          name="isbn"
          label="ISBN"
          placeholder="Digite o ISBN do livro"
          register={register}
          errors={errors}
          submitCount={submitCount}
        />

        {/* Ano */}
        <BookInput
          name="year"
          label="Ano de Publicação"
          placeholder="Digite o ano de publicação"
          register={register}
          errors={errors}
          submitCount={submitCount}
        />
      </div>

      {/* Coluna 2 */}
      <div className="grid grid-rows-3 gap-6">

        {/* Autor */}
        <BookInput
          name="author"
          label="Autor"
          placeholder="Digite o nome do autor"
          register={register}
          errors={errors}
          submitCount={submitCount}
        />

        {/* Editora */}
        <BookInput
          name="publisher"
          label="Editora"
          placeholder="Digite a editora"
          register={register}
          errors={errors}
          submitCount={submitCount}
        />

        {/* Quantidade */}
        <BookInput
          name="quantity"
          label="Quantidade"
          placeholder="Digite a quantidade disponível"
          register={register}
          errors={errors}
          submitCount={submitCount}
        />
      </div>
    </div>
  )
}