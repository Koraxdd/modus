const HEADINGS = [
    "COMPANY",
    "ROLE",
    "STATUS",
    "DATE APPLIED",
    "LAST UPDATE",
] as const

export default function ApplicationsTableHeader() {
    return (
        <thead className="border-b border-border">
            <tr>
                {HEADINGS.map((heading) => (
                    <th
                        key={heading}
                        className="text-left px-4 py-2.5 cursor-pointer text-[11px] font-medium tracking-wider text-muted-foreground"
                    >
                        {heading}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
