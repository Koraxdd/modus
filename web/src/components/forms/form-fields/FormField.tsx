import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    type Control,
    Controller,
    type FieldValues,
    type Path,
} from "react-hook-form"

type FormFieldProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    placeholder: string
    control: Control<T>
    type?: "text" | "email"
    autoComplete?: string
}

export default function FormField<T extends FieldValues>({
    name,
    label,
    placeholder,
    control,
    type = "text",
    autoComplete,
}: FormFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                        htmlFor={field.name}
                        className="text-xs text-zinc-600"
                    >
                        {label}
                    </FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        type={type}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className="h-10"
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
