import type { FooterColumn, Link } from "@/types/navigation.types"

export const footerColumns: FooterColumn[] = [
    {
        title: "PRODUCT",
        links: [
            { label: "Features", href: "/product/features" },
            { label: "Pricing", href: "/product/pricing" },
            { label: "Changelog", href: "/product/changelog" },
            { label: "Roadmap", href: "/product/roadmap" },
            { label: "Browser Extension", href: "/product/browser-extension" },
        ],
    },
    {
        title: "RESOURCES",
        links: [
            { label: "Documentation", href: "/resources/docs" },
            { label: "Blog", href: "/resources/blog" },
            { label: "Templates", href: "/resources/templates" },
            { label: "API", href: "/resources/api" },
            { label: "Status", href: "/resources/status" },
        ],
    },
    {
        title: "COMPANY",
        links: [
            { label: "About", href: "/company/about" },
            { label: "Careers", href: "/company/careers" },
            { label: "Press kit", href: "/company/press-kit" },
            { label: "Contact", href: "/company/contact" },
            { label: "Legal", href: "/company/legal" },
        ],
    },
]

export const footerLegalLinks: Link[] = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
]
