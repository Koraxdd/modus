"use client"

import { LoginInput, LoginSchema } from "@/schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FieldGroup } from "../ui/field"
import FormField from "./form-fields/FormField"
import FormPasswordField from "./form-fields/FormPasswordField"
import { Button } from "../ui/button"

export default function LoginForm() {
    const form = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = (data: LoginInput) => {}

    return (
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                    placeholder="••••••••"
                    control={form.control}
                />
                <Button
                    type="submit"
                    size="lg"
                    className="rounded-lg font-semibold py-5 hover:bg-indigo-700 mt-1"
                >
                    Sign in
                </Button>
            </FieldGroup>
        </form>
    )
}
