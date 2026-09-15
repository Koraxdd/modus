"use client"

import { motion } from "motion/react"

export default function AnimatedCheckCircle() {
    return (
        <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            className="absolute"
        >
            <circle
                cx="48"
                cy="48"
                r="44"
                className="fill-indigo-50"
                strokeWidth="2"
            />
            <motion.circle
                cx="48"
                cy="48"
                r="44"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeDasharray="276"
                strokeDashoffset="0"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
                d="M30 48L42 60L66 36"
                stroke="#4F46E5"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="50"
                strokeDashoffset="0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
            />
        </svg>
    )
}
