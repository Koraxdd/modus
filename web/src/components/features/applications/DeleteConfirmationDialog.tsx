"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteJob } from "@/hooks/jobs/useDeleteJob"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type DeleteConfirmationDialogProps = {
    isOpen: boolean
    closeDialog: () => void
    id: string
}

export default function DeleteConfirmationDialog({
    isOpen,
    closeDialog,
    id,
}: DeleteConfirmationDialogProps) {
    const router = useRouter()
    const { mutate: deleteJob } = useDeleteJob()

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete this application.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2">
                    <button
                        onClick={() => closeDialog()}
                        className="bg-mauve-100 dark:bg-[#161620] rounded-lg py-3 font-medium transition-colors text-zinc-400 dark:text-[#50506a] hover:text-slate-800 dark:hover:text-[#c8c8dc]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            deleteJob(id, {
                                onSuccess: () => {
                                    router.push("/dashboard/applications")
                                },
                                onError: () => {
                                    toast.error("Failed to delete. Try again.")
                                },
                            })
                        }
                        className="flex items-center justify-center py-3 gap-2 font-medium transition-opacity hover:opacity-80 rounded-lg bg-[#fff0f0] dark:bg-[#2a1010] text-[#dc2626] dark:text-[#f87171] border border-[#dc2626]/20 dark:border-[#f87171]/20"
                    >
                        <Trash2 className="size-3.5" />
                        Delete
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
