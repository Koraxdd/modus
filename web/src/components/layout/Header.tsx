import Link from "next/link"
import BrandIcon from "../BrandIcon"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-transparent">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-600/25 shrink-0 rounded-md">
                        <BrandIcon />
                    </div>
                    <h3 className="font-semibold text-base">Modus</h3>
                </div>
                <div>
                    <Link
                        href="/register"
                        className={cn(
                            buttonVariants({
                                variant: "default",
                                size: "lg",
                            }),
                            "px-4 rounded-lg"
                        )}
                    >
                        Get started free
                    </Link>
                </div>
            </div>
        </header>
    )
}
