import BrandIcon from "@/components/icons/BrandIcon"
import GithubIcon from "@/components/icons/GithubIcon"
import GoogleIcon from "@/components/icons/GoogleIcon"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { ReactNode } from "react"

type AuthCardProps = {
    title: string
    description: string
    footer?: ReactNode
    children: ReactNode
}

export default function AuthCard({
    title,
    description,
    footer,
    children,
}: AuthCardProps) {
    return (
        <Card className="w-full max-w-md shadow-sm ring-zinc-200/80 dark:ring-[#24242f] px-4 py-10">
            <CardHeader>
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/25 rounded-md">
                        <BrandIcon />
                    </div>
                    <h3 className="font-semibold text-base">Modus</h3>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight mb-1">
                    {title}
                </CardTitle>
                <CardDescription className="text-sm mb-8">
                    {description}
                </CardDescription>
                <div className="-mt-2 h-px bg-zinc-100 dark:bg-[#24242f]" />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    )
}
