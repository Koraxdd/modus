type BrandIconProps = {
    size?: number
}

export default function BrandIcon({ size = 14 }: BrandIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.5 1L11.5 3.75V9.25L6.5 12L1.5 9.25V3.75L6.5 1Z"
                fill="white"
                fillOpacity="0.25"
            />
            <path
                d="M6.5 3.5L9.5 5.25V8.75L6.5 10.5L3.5 8.75V5.25L6.5 3.5Z"
                fill="white"
            />
        </svg>
    )
}
