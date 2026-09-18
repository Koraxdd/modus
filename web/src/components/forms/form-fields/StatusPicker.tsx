"use client"

import StatusButton from "@/components/features/applications/StatusButton"
import type { ApplicationStatus } from "@/components/layout/applications/ApplicationsHeader"
import { statusConfig } from "@/lib/applications/statusConfig"
import {
    type Control,
    Controller,
    type FieldValues,
    type Path,
} from "react-hook-form"

type StatusPickerProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
}

export default function StatusPicker<T extends FieldValues>({
    name,
    control,
}: StatusPickerProps<T>) {
    const { all, ...statuses } = statusConfig

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                    {Object.keys(statuses).map((status) => (
                        <StatusButton
                            key={status}
                            status={status as ApplicationStatus}
                            active={status === field.value}
                            countEnabled={false}
                            toggleStatus={field.onChange}
                        />
                    ))}
                </div>
            )}
        />
    )
}
