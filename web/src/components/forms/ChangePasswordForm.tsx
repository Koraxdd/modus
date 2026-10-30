"use client"

import { useForm } from "react-hook-form"
import FormPasswordField from "./form-fields/FormPasswordField"
import {
    type ChangePasswordInput,
    ChangePasswordSchema,
} from "@/schemas/settings.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useUpdatePassword } from "@/hooks/users/useUpdatePassword"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { cn } from "@/lib/utils"

export default function ChangePasswordForm() {
    const { mutate: updatePassword, isPending } = useUpdatePassword()

    const form = useForm<ChangePasswordInput>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (data: ChangePasswordInput) => {
        updatePassword(data, {
            onSuccess: () => {
                toast.success("Password changed!")
                form.reset()
            },
            onError: (err) => toast.error(err.message),
        })
    }

    return (
        <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <FormPasswordField
                name="currentPassword"
                label="CURRENT PASSWORD"
                placeholder="••••••••"
                control={form.control}
            />
            <FormPasswordField
                name="newPassword"
                label="NEW PASSWORD"
                placeholder="••••••••"
                control={form.control}
            />
            <FormPasswordField
                name="confirmPassword"
                label="CONFIRM PASSWORD"
                placeholder="••••••••"
                control={form.control}
            />
            <Button
                type="submit"
                disabled={isPending}
                className={cn(
                    "mt-2 self-end h-9 px-5 text-[13px] gap-2",
                    isPending ? "opacity-60" : "hover:bg-indigo-700"
                )}
            >
                {isPending ? (
                    <>
                        <Spinner />
                        Updating...
                    </>
                ) : (
                    "Update password"
                )}
            </Button>
        </form>
    )
}
