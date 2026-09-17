import { Control, Controller, FieldValues, Path } from "react-hook-form"

type ColorPickerProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
}

export const COLOR_OPTIONS = [
    "#6366F1",
    "#10B981",
    "#EF4444",
    "#F59E0B",
    "#3B82F6",
    "#EC4899",
    "#22C55E",
] as const

export default function ColorPicker<T extends FieldValues>({
    name,
    control,
}: ColorPickerProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex gap-1.5 flex-wrap">
                    {COLOR_OPTIONS.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => field.onChange(color)}
                            style={{
                                backgroundColor: color,
                                ...(field.value === color && {
                                    boxShadow: `0 0 0 2px white, 0 0 0 4px ${color}`,
                                }),
                            }}
                            className="w-5 h-5 rounded-full transition-transform hover:scale-110"
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            )}
        />
    )
}
