import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function CVStep({ next }: { next: () => void }) {
    return (
        <>
            <CardHeader className="text-center">
                <CardTitle className="font-bold text-3xl mb-3"></CardTitle>
                <CardDescription className="text-[15px] text-muted-foreground leading-[1.7]"></CardDescription>
                <CardContent className="mt-6"></CardContent>
                <CardFooter>
                    <Button
                        size="lg"
                        className="w-full mt-8 p-6.5 text-[15px] transition-all rounded-xl font-semibold shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5"
                    >
                        Get started
                        <ArrowRight />
                    </Button>
                </CardFooter>
            </CardHeader>
        </>
    )
}
