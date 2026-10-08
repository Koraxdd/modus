import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, File } from "lucide-react"

export default function PostingDocumentsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xs text-muted-foreground dark:text-[#50506a] font-semibold">
                    DOCUMENTS
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center -mt-2 gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-[#161620] border border-border">
                    <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50 dark:bg-[#1a2035]">
                        <File className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                        <span className="text-xs font-medium truncate mb-1">
                            longplaceholderfilename
                        </span>
                        <span className="text-[11px] font-medium text-muted-foreground dark:text-[#50506a]">
                            100 KB
                        </span>
                    </div>
                    <button className="text-muted-foreground dark:text-[#50506a] transition-colors hover:text-primary dark:hover:text-[#5c4fee]">
                        <Download className="size-3.5" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
