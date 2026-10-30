export type Link = {
    label: string
    href: string
}

export type FooterColumn = {
    title: "PRODUCT" | "PROJECT"
    links: Link[]
}
