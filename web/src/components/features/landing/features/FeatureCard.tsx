import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"
import type { ReactNode } from "react"

type FeatureCardProps = {
    icon: ReactNode
    title: string
    description: string
    points: string[]
}

export default function FeatureCard({
    icon,
    title,
    description,
    points,
}: FeatureCardProps) {
    return (
        <Card className="ring-zinc-200/80 hover:ring-zinc-300 hover:shadow-lg transition-all duration-200">
            <CardHeader>
                <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-lg mb-5">
                    {icon}
                </div>
                <CardTitle className="text-[17px] font-semibold tracking-tight">
                    {title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm font-medium mt-2.5 leading-[1.65]">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-t border-zinc-100 pt-5 space-y-3">
                    {points.map((point) => (
                        <div
                            key={point}
                            className="flex items-center gap-2 text-muted-foreground text-xs font-medium"
                        >
                            <span className="w-3.5 h-3.5 bg-indigo-50 flex items-center justify-center rounded-full">
                                <Check
                                    strokeWidth={3.5}
                                    className="text-primary w-2 h-2"
                                />
                            </span>
                            <p>{point}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
