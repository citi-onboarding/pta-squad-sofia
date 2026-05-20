import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"


type BookInputProps<T extends FieldValues> = {
  name: Path<T>,
  label: string,
  placeholder?: string,
  register: UseFormRegister<T>,
  errors: FieldErrors<T>,
  submitCount: number
}

export default function BookInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  errors,
  submitCount,
}: BookInputProps<T>) {
  const error = errors[name]

  return (
    <div>
      <label className="font-medium">{label}</label>

      <input
        {...register(name)}
        type="text"
        placeholder={placeholder}
        className="mt-2 flex w-96 items-center rounded-lg border py-3.5 pl-4"
      />

      {error && (
        <span
          key={submitCount}
          className="animate-shake mt-1 block text-sm text-red-500"
        >
          {error.message as string}
        </span>
      )}
    </div>
  )
}