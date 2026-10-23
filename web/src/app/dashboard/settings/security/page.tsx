import ChangePasswordForm from "@/components/forms/ChangePasswordForm"

export default function SettingsSecurityPage() {
    return (
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
            <h3 className="text-sm font-semibold">Password</h3>
            <p className="text-xs text-[#888898] dark:text-[#50506a] mt-1 mb-5">
                Choose a strong password with at least 8 characters.
            </p>
            <ChangePasswordForm />
        </div>
    )
}
