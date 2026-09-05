import AuthCard from "@/components/features/auth/AuthCard"
import RegisterForm from "@/components/forms/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {
    return (
        <AuthCard
            title="Create your account"
            description="Start organising your job search today."
            footer={
                <p className="text-muted-foreground text-sm mt-6 mx-auto">
                    Already have an account?
                    <Link
                        href="/login"
                        className="ml-1 text-primary text-sm font-semibold transition-colors hover:text-indigo-800"
                    >
                        Sign in
                    </Link>
                </p>
            }
        >
            <RegisterForm />
        </AuthCard>
    )
}
