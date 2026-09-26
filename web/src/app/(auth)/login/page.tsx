import AuthCard from "@/components/features/auth/AuthCard"
import LoginForm from "@/components/forms/LoginForm"
import Link from "next/link"

export default function LoginPage() {
    return (
        <AuthCard
            title="Welcome back"
            description="Sign in to continue to Modus."
            footer={
                <p className="text-muted-foreground text-sm mx-auto">
                    Don't have an account?
                    <Link
                        href="/register"
                        className="ml-1 text-primary dark:text-[#7b6ff0] text-sm font-semibold transition-all hover:text-indigo-800 dark:hover:opacity-80"
                    >
                        Sign up free
                    </Link>
                </p>
            }
        >
            <LoginForm />
        </AuthCard>
    )
}
