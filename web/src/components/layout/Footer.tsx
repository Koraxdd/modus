import Link from "next/link"
import BrandIcon from "../icons/BrandIcon"
import { footerColumns, footerLegalLinks } from "@/lib/links/footerLinks"

export default function Footer() {
    return (
        <footer className="py-14 px-6 border-t border-border/80 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-100">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-600/25 shrink-0 rounded-md">
                                <BrandIcon size={12} />
                            </div>
                            <span className="text-sm font-semibold">Modus</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            AI-powered job application tracker. Land your next
                            role with less stress.
                        </p>
                    </div>
                    {footerColumns.map((column) => (
                        <nav key={column.title}>
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-zinc-400">
                                {column.title}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {column.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="text-[13px] text-zinc-600 hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    ))}
                </div>
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-400">
                        &copy; {new Date().getFullYear()} Modus. All rights
                        reserved.
                    </p>
                    <nav className="flex items-center gap-5">
                        {footerLegalLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}
