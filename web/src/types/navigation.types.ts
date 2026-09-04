export type Link = {
    label: string
    href: string
}

export type FooterColumn = {
    title: "PRODUCT" | "RESOURCES" | "COMPANY"
    links: Link[]
}
