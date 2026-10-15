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
import { useATS } from "@/hooks/ai/useATS"
import { useDocuments } from "@/hooks/documents/useDocuments"
import { cn } from "@/lib/utils"
import { Document } from "@/types/document.types"
import { Astroid, Info } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ATSPage() {
    const { data: documents = [] } = useDocuments()
    const { mutate: analyseCV, data: atsResult, isPending } = useATS()
    const [selectedCV, setSelectedCV] = useState<Document | null>(null)
    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (documents.length && !selectedCV) {
            setSelectedCV(documents[0])
        }
    }, [documents, selectedCV])

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
                    <div className="rounded-2xl p-5 grid md:grid-cols-2 gap-4 bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
                        <div className="flex flex-col gap-2">
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
                                                (document) => document.id === id
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
                            <div className="mt-2">
                                <div className="flex items-start rounded-xl p-3 mb-3 gap-2.5 bg-[#eef0ff] dark:bg-[#1a2035]">
                                    <Info className="size-3.5 shrink-0 text-primary" />
                                    <p className="text-[11px] leading-relaxed dark:text-[#c8c8d2]">
                                        We compare role keywords, parsing
                                        quality, skills, seniority, and
                                        measurable impact in your selected CV.
                                    </p>
                                </div>
                                <Button
                                    disabled={isPending}
                                    size="lg"
                                    onClick={() => {
                                        if (selectedCV) {
                                            analyseCV(
                                                {
                                                    documentId: selectedCV.id,
                                                    description,
                                                },
                                                {
                                                    onError: () =>
                                                        toast.error(
                                                            "The AI service is busy. Try again in a minute."
                                                        ),
                                                }
                                            )
                                        }
                                    }}
                                    className={cn(
                                        "w-full transition-all rounded-lg text-[13px]",
                                        isPending
                                            ? "opacity-80"
                                            : "hover:bg-indigo-700"
                                    )}
                                >
                                    {isPending ? (
                                        <>
                                            <Spinner />
                                            Matching CV to role
                                        </>
                                    ) : (
                                        <>
                                            <Astroid
                                                strokeWidth={2.5}
                                                className="size-2.5"
                                            />
                                            Analyse match
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold mb-2 text-[#888898] dark:text-[#50506a] tracking-wider">
                                JOB DESCRIPTION
                            </label>
                            <textarea
                                rows={7}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Paste the full job description here..."
                                className="resize-none rounded-xl p-3 text-xs dark:text-[#c8c8d2] leading-relaxed outline-none bg-[#f8f8fc] dark:bg-[#16161e] transition-shadow border border-border dark:border-[#24242f] focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
