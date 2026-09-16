"use client"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import {
    type Control,
    Controller,
    type FieldValues,
    type Path,
} from "react-hook-form"

type FormPasswordFieldProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    placeholder: string
    control: Control<T>
    autoComplete?: string
}

export default function FormPasswordField<T extends FieldValues>({
    name,
    label,
    placeholder,
    control,
    autoComplete,
}: FormPasswordFieldProps<T>) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

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
                    <div className="relative">
                        <Input
                            {...field}
                            id={field.name}
                            type={!showPassword ? "password" : "text"}
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            className="h-10 pr-8"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                        >
                            {!showPassword ? (
                                <Eye size={16} />
                            ) : (
                                <EyeOff size={16} />
                            )}
                        </button>
                    </div>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
