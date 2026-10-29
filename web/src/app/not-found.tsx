"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col text-center">
                <h1 className="text-4xl">Page Not Found</h1>
                <p className="text-[#888898] text-sm mt-2">
                    Could not find the requested resource.
                </p>
                <Button
                    size="lg"
                    onClick={() => router.back()}
                    className="hover:bg-indigo-700 mt-4"
                >
                    Go back
                </Button>
            </div>
        </div>
    )
}
