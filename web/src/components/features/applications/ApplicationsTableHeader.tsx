import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import type { SortField, SortOrder } from "./ApplicationsTable"

const HEADINGS = [
    { field: "company", label: "COMPANY" },
    { field: "role", label: "ROLE" },
    { field: "status", label: "STATUS" },
    { field: "dateApplied", label: "DATE APPLIED" },
    { field: "lastUpdate", label: "LAST UPDATE" },
] as const

type ApplicationsTableHeaderProps = {
    sortField: SortField
    sortOrder: SortOrder
    onSort: (field: SortField) => void
}

export default function ApplicationsTableHeader({
    sortField,
    sortOrder,
    onSort,
}: ApplicationsTableHeaderProps) {
    return (
        <thead className="border-b border-border">
            <tr>
                {HEADINGS.map(({ field, label }) => (
                    <th
                        key={field}
                        onClick={() => onSort(field)}
                        className="text-left px-4 py-2.5 cursor-pointer text-[11px] font-medium tracking-wider text-muted-foreground"
                    >
                        <div className="flex items-center gap-1.5">
                            {label}
                            {sortField !== field ? (
                                <ArrowUpDown className="size-3 text-zinc-400" />
                            ) : sortOrder === "desc" ? (
                                <ArrowUp className="size-3 text-primary" />
                            ) : (
                                <ArrowDown className="size-3 text-primary" />
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}
