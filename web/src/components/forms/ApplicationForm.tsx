"use client"

import {
    ApplicationInput,
    ApplicationSchema,
} from "@/schemas/application.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormField from "./form-fields/FormField"
import ColorPicker from "./form-fields/ColorPicker"
import { FieldLabel } from "../ui/field"

export default function ApplicationForm() {
    const form = useForm<ApplicationInput>({
        resolver: zodResolver(ApplicationSchema),
        defaultValues: {
            company: "",
            color: "#6366F1",
            role: "",
            status: "SAVED",
            location: "",
            salary: "",
            url: "",
        },
    })

    const onSubmit = async (data: ApplicationInput) => {}

    return (
        <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex gap-3">
                <FormField
                    name="company"
                    label="COMPANY *"
                    placeholder="e.g. Google"
                    control={form.control}
                />
                <div className="flex flex-col gap-2">
                    <FieldLabel className="text-xs text-zinc-600">
                        COLOR
                    </FieldLabel>
                    <ColorPicker name="color" control={form.control} />
                </div>
            </div>
            <FormField
                name="role"
                label="ROLE *"
                placeholder="e.g. Senior Product Designer"
                control={form.control}
            />
            <div className="flex gap-3">
                <FormField
                    name="location"
                    label="LOCATION"
                    placeholder="Remote"
                    control={form.control}
                />
                <FormField
                    name="salary"
                    label="SALARY"
                    placeholder="$120-150k"
                    control={form.control}
                />
            </div>
            <FormField
                name="url"
                label="JOB URL"
                placeholder="https://company.com/jobs/..."
                control={form.control}
                type="url"
            />
        </form>
    )
}
