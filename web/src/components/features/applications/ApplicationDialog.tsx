"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useUI } from "@/lib/stores/UIStore"

export default function ApplicationDialog() {
    const { isApplicationOpen, closeApplication } = useUI()

    return (
        <Dialog
            open={isApplicationOpen}
            onOpenChange={(open) => !open && closeApplication()}
        >
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold">
                        Add Application
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
