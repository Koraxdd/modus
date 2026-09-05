import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { FeatureCard } from "@/lib/cards/featureCards"
import { Check } from "lucide-react"

type FeatureCardProps = {
    card: FeatureCard
}

export default function FeatureCard({ card }: FeatureCardProps) {
    const { icon: Icon, title, description, features } = card

    return (
        <Card className="ring-zinc-200/80 hover:ring-zinc-300 hover:shadow-lg transition-all duration-200">
            <CardHeader>
                <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-lg mb-5">
                    <Icon className="text-primary w-5 h-5" />
                </div>
                <CardTitle className="text-[17px] font-semibold tracking-tight">
                    {title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm mt-2.5 leading-[1.65]">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-t border-zinc-100 pt-5 space-y-3">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center gap-2 text-muted-foreground text-xs"
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
        </Card>
    )
}
