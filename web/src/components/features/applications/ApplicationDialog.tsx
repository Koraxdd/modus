"use client"

import ApplicationForm from "@/components/forms/ApplicationForm"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useUIStore } from "@/lib/stores/UIStore"

export default function ApplicationDialog() {
    const isApplicationOpen = useUIStore((state) => state.isApplicationOpen)
    const closeApplication = useUIStore((state) => state.closeApplication)

    return (
        <Dialog
            open={isApplicationOpen}
            onOpenChange={(open) => !open && closeApplication()}
        >
            <DialogContent className="max-w-sm">
                <DialogHeader className="-mx-6 -mt-6 px-6 py-4 border-b border-border">
                    <DialogTitle className="text-base font-bold">
                        Add Application
                    </DialogTitle>
                </DialogHeader>
                <ApplicationForm />
            </DialogContent>
        </Dialog>
    )
}
