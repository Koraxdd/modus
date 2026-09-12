"use client"

import { type LoginInput, LoginSchema } from "@/schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FieldGroup } from "../ui/field"
import FormField from "./form-fields/FormField"
import FormPasswordField from "./form-fields/FormPasswordField"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"

export default function LoginForm() {
    const router = useRouter()

    const form = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            )

            const result = (await res.json()) as ApiResult<{ user: PublicUser }>

            if (!result.success) {
                console.error("Login failed:", result.error)
                form.setError("root", { message: result.error })
                return
            }

            if (result.data.user.hasCompletedOnboarding) {
                router.push("/dashboard")
            } else {
                router.push("/onboarding")
            }
        } catch (err) {
            console.error("Login failed:", err)
            toast.error("Something went wrong. Please try again.")
        }
    }

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
                {form.formState.errors.root && (
                    <span className="text-sm font-normal text-destructive">
                        {form.formState.errors.root.message}
                    </span>
                )}
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
