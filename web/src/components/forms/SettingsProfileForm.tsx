"use client"

import { useForm } from "react-hook-form"
import FormField from "./form-fields/FormField"
import { ProfileInput, ProfileSchema } from "@/schemas/settings.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import type { PublicUser } from "@shared/types/user.types"
import { useUpdateUser } from "@/hooks/users/useUpdateUser"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner"

export default function SettingsProfileForm({ user }: { user: PublicUser }) {
    const { mutate: updateUser, isPending } = useUpdateUser()

    const form = useForm<ProfileInput>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            fullName: user.fullName,
            email: user.email,
        },
    })

    const onSubmit = async (data: ProfileInput) => {
        updateUser(
            { fullName: data.fullName, email: data.email },
            {
                onSuccess: () => toast.success("Profile updated!"),
                onError: (err) => toast.error(err.message),
            }
        )
    }

    const isDisabled = isPending || !form.formState.isDirty

    return (
        <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    name="fullName"
                    label="FULL NAME"
                    control={form.control}
                />
                <FormField
                    name="email"
                    label="EMAIL ADDRESS"
                    control={form.control}
                />
            </div>
            <Button
                type="submit"
                disabled={isDisabled}
                className={cn(
                    "self-end h-9 px-5 text-[13px] gap-2",
                    isDisabled ? "opacity-60" : "hover:bg-indigo-700"
                )}
            >
                {isPending ? (
                    <>
                        <Spinner />
                        Saving...
                    </>
                ) : (
                    "Save changes"
                )}
            </Button>
        </form>
    )
}
