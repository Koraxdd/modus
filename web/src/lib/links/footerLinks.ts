import type { FooterColumn, Link } from "@/types/navigation.types"

export const footerColumns: FooterColumn[] = [
    {
        title: "PRODUCT",
        links: [
            { label: "Features", href: "/#features" },
            { label: "Pricing", href: "/#pricing" },
        ],
    },
    {
        title: "PROJECT",
        links: [{ label: "GitHub", href: "https://github.com/Koraxdd" }],
    },
]
