"use client"

import { useDeleteDocument } from "@/hooks/documents/useDeleteDocument"
import { useDocuments } from "@/hooks/documents/useDocuments"
import { useUploadDocument } from "@/hooks/documents/useUploadDocument"
import { format } from "date-fns"
import { Download, Eye, File, Trash2, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

export default function ManagerPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [fileUrl, setFileUrl] = useState<string>("")
    const { data: documents = [] } = useDocuments()
    const { mutate: uploadDocument } = useUploadDocument()
    const { mutate: deleteDocument } = useDeleteDocument()

    return (
        <div className="px-4 md:px-6 py-6 overflow-auto">
            <div className="max-w-225 mx-auto flex flex-col gap-6">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="group w-full rounded-2xl p-8 text-center transition-colors border-2 border-dashed border-border bg-[#fafaff] flex flex-col items-center justify-center hover:border-indigo-300 hover:bg-indigo-50/30 dark:bg-[#16161e] dark:border-[#2a2a3e] dark:hover:border-[#7b6ff0] dark:hover:bg-[#16161e]/50"
                >
                    <input
                        ref={fileInputRef}
                        accept=".pdf,.doc,.docx"
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            uploadDocument(file, {
                                onSuccess: () => {
                                    toast.success(`${file?.name} uploaded`)
                                },
                            })
                        }}
                        className="hidden"
                    />
                    <div className="mb-4 w-12 h-12 rounded-xl text-zinc-400 dark:text-[#50506a] flex items-center justify-center bg-[#efeff6] dark:bg-[#1c1c26] group-hover:border-indigo-200 dark:group-hover:border-[#7b6ff0]/50 group-hover:text-indigo-500 dark:group-hover:text-indigo-500">
                        <Upload className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold mb-1 group-hover:text-indigo-700 dark:group-hover:text-[#7b6ff0] transition-colors">
                            Upload your CV
                        </p>
                        <p className="text-xs text-[#888898] dark:text-[#50506a] mt-0.5">
                            PDF or DOCX · up to 5 MB
                        </p>
                    </div>
                </button>
                {documents.length > 0 && (
                    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                        <div className="border border-border dark:border-[#1e1e2a] rounded-2xl overflow-hidden self-start">
                            <div className="px-5 py-3 bg-[#f4f4fa] dark:bg-[#141420]">
                                <span className="text-[11px] font-semibold text-[#888898] dark:text-[#50506a] tracking-wider">
                                    VERSION HISTORY
                                </span>
                            </div>
                            {documents.map((document) => {
                                const downloadUrl = document.fileUrl.replace(
                                    "/upload/v",
                                    "/upload/fl_attachment/v"
                                )

                                return (
                                    <div
                                        key={document.id}
                                        className="group bg-white dark:bg-[#1c1c26] hover:bg-[#fafaff] dark:hover:bg-[#222230] px-5 py-4 transition-colors flex items-center gap-4 border-t border-border dark:border-[#1e1e2a]"
                                    >
                                        <div className="size-9 flex items-center justify-center rounded-xl shrink-0 bg-primary text-white">
                                            <File className="size-4.5" />
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-[13px] font-semibold truncate">
                                                {document.title}
                                            </span>
                                            <span className="text-[11px] text-[#888898]">
                                                {format(
                                                    document.createdAt,
                                                    "MMM d, yyyy"
                                                )}{" "}
                                                ·{" "}
                                                {(
                                                    document.fileSize / 1024
                                                ).toFixed()}{" "}
                                                KB
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={() =>
                                                    setFileUrl(document.fileUrl)
                                                }
                                                className="text-[#888898] transition-colors hover:text-primary size-7 flex items-center justify-center"
                                            >
                                                <Eye className="size-3.5" />
                                            </button>
                                            <a
                                                href={downloadUrl}
                                                download={document.title}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[#888898] transition-colors hover:text-primary cursor-pointer size-7 flex items-center justify-center"
                                            >
                                                <Download className="size-3.5" />
                                            </a>
                                            <button
                                                onClick={() =>
                                                    deleteDocument(
                                                        document.id,
                                                        {
                                                            onSuccess: () => {
                                                                toast.success(
                                                                    "Version removed"
                                                                )
                                                                if (
                                                                    fileUrl ===
                                                                    document.fileUrl
                                                                ) {
                                                                    setFileUrl(
                                                                        ""
                                                                    )
                                                                }
                                                            },
                                                        }
                                                    )
                                                }
                                                className="text-[#888898] transition-colors hover:text-[#dc2626] size-7 flex items-center justify-center"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {fileUrl ? (
                            <div className="border border-border dark:border-[#1e1e2a] rounded-2xl overflow-hidden h-150 bg-white dark:bg-[#1c1c26]">
                                <iframe
                                    src={fileUrl}
                                    className="w-full h-full border-none"
                                />
                            </div>
                        ) : (
                            <div className="rounded-2xl flex items-center justify-center min-h-64 bg-white dark:bg-[#1c1c26] border border-border">
                                <p className="text-xs text-[#888898] dark:text-[#50506a]">
                                    Select the eye icon to view CV content
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
