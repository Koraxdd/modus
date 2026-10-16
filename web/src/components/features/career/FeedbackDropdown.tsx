"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type Feedback = {
    title: string
    score: number
    color: string
    tips: {
        text: string
        type: string
    }[]
}

const MotionChevron = motion(ChevronDown)

export default function FeedbackDropdown({ feedback }: { feedback: Feedback }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { title, color, score, tips } = feedback

    return (
        <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative rounded-xl border border-border overflow-hidden"
        >
            <div className="flex items-center gap-4 bg-white w-full px-5 py-4">
                <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                />
                <span className="text-[13px] font-semibold flex-1">
                    {title}
                </span>
                <span className="text-sm font-bold" style={{ color }}>
                    {score}
                </span>
                <MotionChevron
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className="size-3 text-[#888898]"
                />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: {
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                            },
                            opacity: {
                                duration: 0.2,
                            },
                        }}
                        className="overflow-hidden"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="px-5 py-3 flex flex-col gap-2.5 bg-[#fafaff] border-t border-border"
                        >
                            {tips.map(({ text, type }) => (
                                <div
                                    key={text}
                                    className="flex items-center gap-2.5"
                                >
                                    <div
                                        className={cn(
                                            "size-1.5 rounded-full",
                                            (type === "missing" ||
                                                type === "error") &&
                                                "bg-[#ef4444]",
                                            (type === "suggested" ||
                                                type === "warning") &&
                                                "bg-[#f59e0b]",
                                            (type === "strong" ||
                                                type === "good") &&
                                                "bg-[#10b981]"
                                        )}
                                    />
                                    <span className="text-xs leading-relaxed">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
