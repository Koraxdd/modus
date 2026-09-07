"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FieldGroup } from "../ui/field"
import { type RegisterInput, RegisterSchema } from "@/schemas/register.schema"
import FormField from "./form-fields/FormField"
import FormPasswordField from "./form-fields/FormPasswordField"

export default function RegisterForm() {
    const form = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: RegisterInput) => {}

    return (
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormField
                    name="fullName"
                    label="Full name"
                    placeholder="Alex Johnson"
                    control={form.control}
                />
                <FormField
                    name="email"
                    label="Email address"
                    placeholder="you@example.com"
                    control={form.control}
                    type="email"
                    autoComplete="email"
                />
                <FormPasswordField
                    name="password"
                    label="Password"
                    placeholder="Min. 8 characters"
                    control={form.control}
                />
                <Button
                    type="submit"
                    size="lg"
                    className="cursor-pointer rounded-lg font-semibold py-5 hover:bg-indigo-700"
                >
                    Create account
                </Button>
            </FieldGroup>
        </form>
    )
}
