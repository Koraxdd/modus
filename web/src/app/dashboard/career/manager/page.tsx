"use client"

import { useApiFetch } from "@/hooks/auth/useApiFetch"
import { useDocuments } from "@/hooks/documents/useDocuments"
import { uploadDocument } from "@/lib/api/documents"
import { format } from "date-fns"
import { Download, File, Trash2, Upload } from "lucide-react"
import { useRef } from "react"

export default function ManagerPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const apiFetch = useApiFetch()
    const { data: documents = [] } = useDocuments()

    return (
        <div className="px-4 md:px-6 py-6 overflow-auto">
            <div className="max-w-170 mx-auto flex flex-col gap-6">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="group w-full rounded-2xl p-8 text-center transition-colors border-2 border-dashed border-border bg-[#fafaff] flex flex-col items-center justify-center hover:border-indigo-300 hover:bg-indigo-50/30 dark:bg-[#16161e] dark:border-[#2a2a3e] dark:hover:border-[#7b6ff0] dark:hover:bg-[#16161e]/50"
                >
                    <input
                        ref={fileInputRef}
                        accept=".pdf,.doc,.docx"
                        type="file"
                        onChange={(e) =>
                            uploadDocument(apiFetch, e.target.files?.[0])
                        }
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
                    <div className="border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 bg-[#f4f4fa]">
                            <span className="text-[11px] font-semibold text-[#888898] tracking-wider">
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
                                    className="group bg-white hover:bg-[#fafaff] px-5 py-4 transition-colors flex items-center gap-4 border-t border-border"
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
                                        <a
                                            href={downloadUrl}
                                            download={document.title}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#888898] transition-colors hover:text-primary cursor-pointer"
                                        >
                                            <Download className="size-3.5" />
                                        </a>
                                        <button className="text-[#888898] transition-colors hover:text-[#dc2626]">
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
