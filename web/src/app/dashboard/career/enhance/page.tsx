"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useEnhance } from "@/hooks/ai/useEnhance"
import { useDocuments } from "@/hooks/documents/useDocuments"
import { cn } from "@/lib/utils"
import { EnhanceResult } from "@/types/ai.types"
import type { Document } from "@/types/document.types"
import { Astroid, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function EnhancePage() {
    const { mutate: enhanceCV, isPending } = useEnhance()
    const { data: documents = [] } = useDocuments()
    const [selectedCV, setSelectedCV] = useState<Document | null>(null)
    const [enhanceResult, setEnhanceResult] = useState<EnhanceResult | null>(
        null
    )

    useEffect(() => {
        if (documents.length && !selectedCV) {
            setSelectedCV(documents[0])
        }
    }, [documents, selectedCV])

    const isDisabled = isPending || !selectedCV

    return (
        <div className="px-4 md:px-6 py-6 overflow-auto">
            <div className="max-w-225 mx-auto">
                {!documents.length ? (
                    <div className="rounded-2xl p-8 text-center bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
                        <p className="text-sm font-semibold">
                            Upload a CV first
                        </p>
                        <p className="text-xs mt-1 text-[#888898]">
                            Add a PDF or DOCX in CV Manager to use this tool.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <div className="rounded-2xl p-5 flex flex-col md:flex-row md:items-end gap-4 border border-border dark:border-[#24242f] bg-white dark:bg-[#1c1c26]">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[11px] font-semibold text-[#888898] dark:text-[#50506a] tracking-wider">
                                    CV VERSION
                                </label>
                                <Select
                                    value={selectedCV?.id ?? ""}
                                    onValueChange={(id) => {
                                        const matched = documents.find(
                                            (doc) => doc.id === id
                                        )
                                        if (matched) setSelectedCV(matched)
                                    }}
                                >
                                    <SelectTrigger className="w-full dark:bg-[#16161e] dark:border-[#24242f]">
                                        <SelectValue>
                                            {(id: string) =>
                                                documents.find(
                                                    (doc) => doc.id === id
                                                )?.title ?? "Select a CV"
                                            }
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#16161e] dark:ring-[#24242f]">
                                        <SelectGroup>
                                            {documents.map((document) => (
                                                <SelectItem
                                                    key={document.id}
                                                    value={document.id}
                                                >
                                                    {document.title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                disabled={isDisabled}
                                size="lg"
                                onClick={() => {
                                    if (selectedCV) {
                                        enhanceCV(selectedCV.id, {
                                            onSuccess: (result) =>
                                                setEnhanceResult(result),
                                            onError: (err) =>
                                                toast.error(err.message),
                                        })
                                    }
                                }}
                                className={cn(
                                    "text-[13px] px-5 rounded-xl transition-all gap-2",
                                    isDisabled
                                        ? "opacity-60"
                                        : "hover:bg-indigo-700"
                                )}
                            >
                                {isPending ? (
                                    <>
                                        <Spinner />
                                        Reviewing...
                                    </>
                                ) : (
                                    <>
                                        <Astroid
                                            strokeWidth={3}
                                            className="size-2.25"
                                        />
                                        Find improvements
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-5">
                            {enhanceResult ? (
                                <div className="flex flex-col gap-3 h-150 overflow-y-auto">
                                    <div>
                                        <p className="text-[13px] font-semibold">
                                            Suggested changes
                                        </p>
                                        <p className="text-[11px] text-[#888898]">
                                            Small changes to strengthen your
                                            writing
                                        </p>
                                    </div>
                                    {enhanceResult.suggestions.map(
                                        ({ original, improved, reason }) => (
                                            <div
                                                key={`${original}-${improved}`}
                                                className="rounded-2xl p-4 bg-white border border-border dark:border-[#24242f] dark:bg-[#1c1c26]"
                                            >
                                                <p className="text-[11px] mb-2 line-through text-[#aaaab8] dark:text-[#3e3e58]">
                                                    {original}
                                                </p>
                                                <p className="text-xs leading-relaxed font-medium">
                                                    {improved}
                                                </p>
                                                <div className="h-px w-full bg-border dark:bg-[#24242f] my-4" />
                                                <p className="text-[13px] font-medium mb-1">
                                                    Why it works
                                                </p>
                                                <p className="text-[11px] text-[#aaaab8] dark:text-[#3e3e58] font-medium">
                                                    {reason}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-2xl p-5 bg-white border border-border dark:border-[#24242f] dark:bg-[#1c1c26]">
                                    <div className="size-11 rounded-2xl flex items-center justify-center shrink-0 mb-4 bg-[#eef0ff] dark:bg-[#1a2035]">
                                        <Zap className="size-5 text-primary" />
                                    </div>
                                    <p className="text-sm font-semibold">
                                        Review improvements in context
                                    </p>
                                    <p className="text-xs leading-relaxed mt-2 text-[#888898] dark:text-[#50506a]">
                                        We'll suggest stronger bullets for the
                                        live CV preview.
                                    </p>
                                </div>
                            )}
                            <div className="border border-border dark:border-[#1e1e2a] rounded-2xl overflow-hidden h-150 bg-white dark:bg-[#1c1c26]">
                                <iframe
                                    src={`${selectedCV?.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-full border-none"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
