"use client"

import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, CircleAlert, FileCheck, Upload, X } from "lucide-react"
import { type ChangeEvent, useRef, useState } from "react"

export default function CVStep({ next }: { next: () => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return
        setFile(selectedFile)
    }

    return (
        <>
            <CardHeader className="text-center">
                <div className="mx-auto">
                    <div className="w-14 h-14 bg-indigo-50 flex items-center justify-center rounded-2xl mb-5">
                        <FileCheck className="text-primary w-6 h-6" />
                    </div>
                </div>
                <CardTitle className="font-bold text-2xl mb-3">
                    Upload your CV
                </CardTitle>
                <CardDescription className="text-[15px] text-muted-foreground leading-[1.7]">
                    We'll use it to tailor cover letters and score your match
                    with job descriptions.
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                        "group flex flex-col justify-center items-center gap-3 border-2 border-dashed p-8 rounded-2xl transition-colors bg-zinc-50/50 hover:border-indigo-300 hover:bg-indigo-50/30",
                        file && "hidden"
                    )}
                >
                    <Input
                        ref={fileInputRef}
                        accept=".pdf,.doc,.docx"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="border border-border w-14 h-14 rounded-2xl text-zinc-400 flex items-center justify-center shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-500">
                        <Upload className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-zinc-700 group-hover:text-indigo-700 transition-colors">
                            Drop your CV here
                        </p>
                        <p className="text-sm text-zinc-400 mt-0.5">
                            or{" "}
                            <span className="text-primary font-medium">
                                browse files
                            </span>{" "}
                            — PDF, DOC
                        </p>
                    </div>
                </button>
                <div
                    className={cn(
                        "rounded-2xl border-2 border-indigo-300 bg-indigo-50/60 p-5 flex items-center justify-between gap-4",
                        !file && "hidden"
                    )}
                >
                    <div className="w-11 h-11 bg-primary flex items-center justify-center rounded-xl shrink-0 shadow-md shadow-primary/25">
                        <FileCheck className="text-white w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="text-sm font-semibold truncate">
                            {file?.name}
                        </span>
                        <span className="text-xs text-primary font-medium mt-0.5">
                            CV uploaded ✓
                        </span>
                    </div>
                    <button
                        onClick={() => setFile(null)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-muted-foreground hover:bg-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3.5 flex gap-3 text-primary mt-2">
                    <CircleAlert className="w-4 h-4 shrink-0" />
                    <p className="text-xs font-medium leading-relaxed">
                        Your CV stays private and is only used to personalise
                        your Modus experience. We never share it.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button
                    size="lg"
                    onClick={next}
                    disabled={!file}
                    className="w-full mt-2 p-6.5 text-[15px] transition-all rounded-xl font-semibold shadow-indigo-600/25 enabled:hover:shadow-lg enabled:hover:shadow-indigo-600/30 enabled:hover:bg-indigo-700 enabled:hover:-translate-y-0.5 disabled:bg-zinc-100 disabled:text-zinc-400"
                >
                    Continue
                    <ArrowRight />
                </Button>
                <button
                    onClick={next}
                    className="text-zinc-400 font-medium hover:text-zinc-700 transition-colors"
                >
                    Skip for now — I'll add it later
                </button>
            </CardFooter>
        </>
    )
}
