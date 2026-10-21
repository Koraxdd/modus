"use client"

import { motion } from "motion/react"

type ScoreCircleProps = {
    color: string
    score: number
}

export default function ScoreCircle({ color, score }: ScoreCircleProps) {
    const radius = 44
    const circumference = 2 * Math.PI * radius
    const percentage = score / 100
    const dashOffset = circumference - percentage * circumference

    return (
        <svg
            width="96"
            height="96"
            viewBox="0 0 112 112"
            className="-rotate-90"
        >
            <circle
                cx="56"
                cy="56"
                r={radius}
                fill="none"
                className="stroke-[#EEEEF8] dark:stroke-[#1E1E2C]"
                strokeWidth="9"
            />
            <motion.circle
                cx="56"
                cy="56"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
        </svg>
    )
}
