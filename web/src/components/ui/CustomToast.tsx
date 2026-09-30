import { CircleAlert } from "lucide-react"

type CustomToastProps = {
    message: string
}

export default function CustomToast({ message }: CustomToastProps) {
    return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12122a] border border-[#1e1e42] shadow-sm">
            <CircleAlert className="text-[#7c6ff0] size-4" />
            <span className="text-[13px] font-medium text-[#d8d8ec]">
                {message}
            </span>
        </div>
    )
}
