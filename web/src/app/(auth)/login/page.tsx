import AuthCard from "@/components/features/auth/AuthCard"
import LoginForm from "@/components/forms/LoginForm"
import Link from "next/link"

export default function LoginPage() {
    return (
        <AuthCard
            title="Welcome back"
            description="Sign in to continue to Modus."
            footer={
                <p className="text-muted-foreground text-sm mt-6 mx-auto">
                    Don't have an account?
                    <Link
                        href="/register"
                        className="ml-1 text-primary text-sm font-semibold transition-colors hover:text-indigo-800"
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
