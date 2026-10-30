"use client"

import AuthCard from "@/components/features/auth/AuthCard"
import LoginForm from "@/components/forms/LoginForm"
import { demoLogin } from "@/lib/api/auth"
import Link from "next/link"

export default function LoginPage() {
    return (
        <AuthCard
            title="Welcome back"
            description="Sign in to continue to Modus."
            footer={
                <div className="flex flex-col mx-auto items-center gap-2">
                    <p className="text-muted-foreground text-sm">
                        Don't have an account?
                        <Link
                            href="/register"
                            className="ml-1 text-primary dark:text-[#7b6ff0] text-sm font-semibold transition-all hover:text-indigo-800 dark:hover:opacity-80"
                        >
                            Sign up free
                        </Link>
                    </p>
                    <p
                        onClick={demoLogin}
                        className="text-muted-foreground text-sm"
                    >
                        Or sign in as{" "}
                        <button className="ml-0.5 text-primary dark:text-[#7b6ff0] text-sm font-semibold transition-all hover:text-indigo-800 dark:hover:opacity-80">
                            demo account
                        </button>
                    </p>
                </div>
            }
        >
            <LoginForm />
        </AuthCard>
    )
}
