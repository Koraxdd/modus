"use client"

import {
    type ApplicationInput,
    ApplicationSchema,
} from "@/schemas/application.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormField from "./form-fields/FormField"
import ColorPicker, { COLOR_OPTIONS } from "./form-fields/ColorPicker"
import { FieldLabel } from "../ui/field"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { useUIStore } from "@/lib/stores/UIStore"
import StatusPicker from "./form-fields/StatusPicker"
import { useCreateJob } from "@/hooks/jobs/useCreateJob"

export default function ApplicationForm() {
    const closeApplication = useUIStore((state) => state.closeApplication)
    const { mutate: createJob } = useCreateJob()

    const form = useForm<ApplicationInput>({
        resolver: zodResolver(ApplicationSchema),
        defaultValues: {
            company: "",
            color: COLOR_OPTIONS[0],
            role: "",
            status: "saved",
            location: "",
            salary: "",
            url: "",
        },
    })

    const onSubmit = async (data: ApplicationInput) => {
        createJob(data, {
            onSuccess: () => {
                closeApplication()
                toast.success(`Job added - ${data.company} (${data.role})`)
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    }

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
            <div className="flex flex-col gap-2">
                <FieldLabel className="text-xs text-zinc-600">
                    STATUS
                </FieldLabel>
                <StatusPicker name="status" control={form.control} />
            </div>
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
            <div className="grid grid-cols-2 md:flex md:justify-end gap-4 border-t border-border -mx-6 -mb-6 px-6 py-4">
                <button
                    type="button"
                    onClick={closeApplication}
                    className="bg-mauve-100 rounded-lg px-4 font-medium transition-colors text-zinc-400 hover:text-slate-800"
                >
                    Cancel
                </button>
                <Button type="submit" className="hover:bg-indigo-700 px-5">
                    Add Application
                </Button>
            </div>
        </form>
    )
}
