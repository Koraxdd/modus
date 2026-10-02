import { RefObject, useEffect } from "react"

type UseOutsideClickProps = {
    ref: RefObject<HTMLDivElement | null>
    callback: () => void
    isOpen: boolean
}

export function useOutsideClick({
    ref,
    callback,
    isOpen,
}: UseOutsideClickProps) {
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [ref, callback, isOpen])
}
