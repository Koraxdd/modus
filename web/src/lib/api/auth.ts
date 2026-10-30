import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export async function demoLogin() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: "demo@gmail.com",
                password: "demodemo123",
            }),
        }
    )

    const result = (await res.json()) as ApiResult<
        | {
              accessToken: string
              user: PublicUser
          }
        | { requires2FA: true }
    >
    if (!result.success) {
        toast.error("Failed to login as demo account. Try again.")
    }

    redirect("/dashboard")
}
