import ChangePasswordForm from "@/components/forms/ChangePasswordForm"

export default function SettingsSecurityPage() {
    return (
        <div className="rounded-2xl p-6 bg-white border border-border">
            <h3 className="text-sm font-semibold">Password</h3>
            <p className="text-xs text-[#888898] mt-1 mb-5">
                Choose a strong password with at least 8 characters.
            </p>
            <ChangePasswordForm />
        </div>
    )
}
