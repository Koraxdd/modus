import { motion } from "motion/react"

export default function BouncingCards() {
    return (
        <div className="relative h-60 w-full max-w-80 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-30 h-30 rounded-full bg-indigo-200/80 blur-2xl" />
            </div>
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -rotate-5 top-8 left-5 scale-90 sm:scale-100"
            >
                <div className="bg-white rounded-2xl border border-border shadow-lg shadow-zinc-900/10 p-3.5 flex flex-col w-50">
                    <div className="flex items-center justify-between gap-2.5 mb-2.5">
                        <div className="bg-violet-500 w-7 h-7 flex items-center justify-center font-bold shrink-0 rounded-lg">
                            <span className="text-white text-[10.5px]">L</span>
                        </div>
                        <span className="font-semibold text-xs">
                            Product Designer
                        </span>
                    </div>
                    <span className="text-amber-700 rounded-full bg-amber-50 px-2 py-0.5 border border-amber-100 text-[8px] font-semibold self-start">
                        Interviewing
                    </span>
                </div>
            </motion.div>
            <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-17 left-25 scale-90 sm:scale-100"
            >
                <div className="bg-white rounded-2xl border border-border shadow-lg shadow-zinc-900/10 p-3.5 flex flex-col w-50">
                    <div className="flex items-center justify-between gap-2.5 mb-2.5">
                        <div className="bg-black w-7 h-7 flex items-center justify-center font-bold shrink-0 rounded-lg">
                            <span className="text-white text-[10.5px]">V</span>
                        </div>
                        <span className="font-semibold text-xs">
                            Senior Eng
                        </span>
                    </div>
                    <div className="h-1.5 bg-zinc-200 rounded-full w-full">
                        <div className="h-full bg-indigo-500 rounded-full w-5/7" />
                    </div>
                    <div className="flex justify-between mt-1 text-[8px]">
                        <span className="text-zinc-400">AI match score</span>
                        <span className="font-semibold text-primary">
                            71 / 100
                        </span>
                    </div>
                </div>
            </motion.div>
            <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-5 left-15 rotate-6 scale-90 sm:scale-100"
            >
                <div className="bg-white rounded-2xl border border-border shadow-lg shadow-zinc-900/10 px-3.5 py-2 flex flex-col w-50">
                    <div className="flex items-center gap-10">
                        <div className="bg-emerald-500 w-7 h-7 flex items-center justify-center font-bold shrink-0 rounded-lg">
                            <span className="text-white text-[10.5px]">N</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-xs">
                                Frontend Eng
                            </span>
                            <span className="text-[8px] text-zinc-400">
                                Offer received!
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
