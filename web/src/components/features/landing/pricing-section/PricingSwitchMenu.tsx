import { Switch } from "@/components/ui/switch"
import { Dispatch, SetStateAction } from "react"

type PricingSwitchMenuProps = {
    isAnnual: boolean
    setIsAnnual: Dispatch<SetStateAction<boolean>>
}

export default function PricingSwitchMenu({
    isAnnual,
    setIsAnnual,
}: PricingSwitchMenuProps) {
    return (
        <div className="flex items-center justify-center gap-3 mt-6 text-[13px] font-medium">
            <span className={isAnnual ? "text-zinc-400" : "text-foreground"}>
                Monthly
            </span>
            <Switch
                size="default"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="cursor-pointer scale-130"
            />
            <div className="space-x-2">
                <span
                    className={isAnnual ? "text-foreground" : "text-zinc-400"}
                >
                    Annual
                </span>
                <span className="text-[10.5px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">
                    Save 20%
                </span>
            </div>
        </div>
    )
}
