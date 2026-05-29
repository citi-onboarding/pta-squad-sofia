import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form"
import BookButton from "../BookButton"


type FormData = {
  title: string
  isbn: string
  year: number
  author: string
  publisher: string
  quantity: number
  category: string
}

type Props = {
  register: UseFormRegister<FormData>
  setValue: UseFormSetValue<FormData>
  selectedCategory: string
  errors: FieldErrors<FormData>
  submitCount: number
}

export default function BookCategorySelector({
  register,
  setValue,
  selectedCategory,
  errors,
  submitCount,
}: Props) {
  return (
    <div className="border-t">
      <p className="mt-6 font-medium">Categoria</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <input type="hidden" {...register("category")} />

        {(
          [
            "Tecnologia",
            "Infantil",
            "Romance",
            "História",
            "Ciências",
          ] as const
        ).map((category) => (
          <BookButton
            key={category}
            category={category}
            selected={selectedCategory === category}
            onClick={() =>
              setValue("category", category, {
                shouldValidate: true,
              })
            }
          />
        ))}

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
  )
}