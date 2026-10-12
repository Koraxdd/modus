"use client"

import { useApiFetch } from "@/hooks/auth/useApiFetch"
import { uploadDocument } from "@/lib/api/documents"
import { Upload } from "lucide-react"
import { useRef } from "react"

export default function ManagerPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const apiFetch = useApiFetch()

    return (
        <div className="px-4 md:px-6 py-6 overflow-auto">
            <div className="max-w-170 w-full mx-auto">
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
            </div>
        </div>
    )
}
