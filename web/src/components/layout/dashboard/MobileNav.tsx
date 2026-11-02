import CustomLink from "@/components/ui/CustomLink"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { Clipboard, LayoutGrid, Settings, Sparkles } from "lucide-react"

export default function MobileNav() {
    return (
        <nav className="md:hidden fixed z-100 bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 shrink-0 bg-white dark:bg-[#111115] border-t border-border dark:border-[#1f1f27]">
            <CustomLink
                title="Dashboard"
                href="/dashboard"
                className="flex flex-col items-center gap-0.5 px-3 h-11 text-[10px] font-bold"
            >
                <LayoutGrid className="size-4 shrink-0" />
                Dashboard
            </CustomLink>
            <CustomLink
                title="Applications"
                href="/dashboard/applications"
                className="flex flex-col items-center gap-0.5 px-3 h-11 text-[10px] font-bold"
            >
                <Clipboard className="size-4 shrink-0" />
                Applications
            </CustomLink>
            <CustomLink
                title="Career"
                href="/dashboard/career/manager"
                className="flex flex-col items-center gap-0.5 px-3 h-11 text-[10px] font-bold"
            >
                <Sparkles className="size-4 shrink-0" />
                Career AI
            </CustomLink>
            <CustomLink
                title="Settings"
                href="/dashboard/settings/profile"
                className="flex flex-col items-center gap-0.5 px-3 h-11 text-[10px] font-bold"
            >
                <Settings className="size-4 shrink-0" />
                Settings
            </CustomLink>
            <ThemeToggle />
        </nav>
    )
}
