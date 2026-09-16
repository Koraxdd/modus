import BrandIcon from "@/components/icons/BrandIcon"
import CustomLink from "@/components/ui/CustomLink"
import LogoutButton from "@/components/ui/LogoutButton"
import { Clipboard, FileText, LayoutGrid, Mail, Settings } from "lucide-react"

export default function Sidebar() {
    return (
        <aside className="flex flex-col items-center py-4 gap-1 shrink-0 w-14 border-r border-border">
            <div className="w-8 h-8 mb-4 bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-600/25 shrink-0 rounded-md">
                <BrandIcon size={16} />
            </div>
            <nav className="flex flex-col gap-1 px-2 w-full">
                <CustomLink title="Dashboard" href="/dashboard">
                    <LayoutGrid className="w-4 h-4" />
                </CustomLink>
                <CustomLink title="Applications" href="/dashboard/applications">
                    <Clipboard className="w-4 h-4" />
                </CustomLink>
                <CustomLink title="CV Review" href="/dashboard/review">
                    <FileText className="w-4 h-4" />
                </CustomLink>
                <CustomLink title="Cover Letters" href="/dashboard/letter">
                    <Mail className="w-4 h-4" />
                </CustomLink>
            </nav>
            <div className="flex-1 flex flex-col justify-end gap-1 px-2 w-full mb-20">
                <CustomLink title="Settings" href="/dashboard/settings">
                    <Settings className="w-4 h-4" />
                </CustomLink>
                <LogoutButton />
            </div>
        </aside>
    )
}
