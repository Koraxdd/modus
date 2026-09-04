import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { TierCard } from "@/lib/pricing/tierCards"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type TierCardProps = {
    card: TierCard
    isAnnual: boolean
}

export default function TierCard({ card, isAnnual }: TierCardProps) {
    const {
        title,
        monthlyPrice,
        annualPrice,
        monthlyLabel,
        annualLabel,
        description,
        features,
        buttonText,
        buttonVariant,
    } = card

    const isPro = title === "PRO"

    return (
        <Card
            className={cn(isPro && "bg-primary shadow-xl shadow-indigo-600/25")}
        >
            <CardHeader>
                <CardTitle
                    className={cn(
                        "text-xs tracking-widest font-medium",
                        isPro ? "text-indigo-200" : "text-muted-foreground"
                    )}
                >
                    {title}
                </CardTitle>
                <div className="flex items-baseline gap-1.5 mt-3">
                    <span
                        className={cn(
                            "text-5xl font-bold",
                            isPro && "text-primary-foreground"
                        )}
                    >
                        ${isAnnual ? annualPrice : monthlyPrice}
                    </span>
                    <span
                        className={cn(
                            "text-sm",
                            isPro ? "text-indigo-200" : "text-zinc-400"
                        )}
                    >
                        {isAnnual ? annualLabel : monthlyLabel}
                    </span>
                </div>
                <CardDescription
                    className={cn(
                        "text-sm mt-2.5 leading-[1.65]",
                        isPro ? "text-indigo-200" : "text-muted-foreground"
                    )}
                >
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className={cn(
                                "flex items-center gap-2 text-[13px]",
                                isPro ? "text-indigo-100" : "text-zinc-700"
                            )}
                        >
                            <span className="w-3.5 h-3.5 bg-indigo-50 flex items-center justify-center rounded-full">
                                <Check
                                    strokeWidth={3.5}
                                    className="text-primary w-2 h-2"
                                />
                            </span>
                            <p>{feature}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button
                    className={cn(
                        buttonVariants({ variant: buttonVariant, size: "lg" }),
                        "w-full py-6 rounded-lg cursor-pointer font-semibold"
                    )}
                >
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    )
}
