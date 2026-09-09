import BrandIcon from "@/components/icons/BrandIcon"

export default function AuthBrandPanel() {
    return (
        <div className="hidden relative p-14 lg:flex flex-col gap-40 w-full bg-[linear-gradient(135deg,#5b4fee_0%,#4338ca_40%,#312e9e_100%)] overflow-hidden">
            <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full opacity-10 bg-[radial-gradient(circle,white_0%,transparent_70%)]" />
            <div className="absolute -bottom-30 -left-35 w-90 h-90 rounded-full opacity-10 bg-[radial-gradient(circle,white_0%,transparent_70%)]" />
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/15 flex items-center justify-center shadow-sm shadow-indigo-600/25 shrink-0 rounded-md">
                    <BrandIcon />
                </div>
                <h3 className="font-semibold text-white text-base">Modus</h3>
            </div>
            <div className="max-w-sm">
                <p className="text-xs font-semibold text-white/50 tracking-widest mb-4">
                    YOUR JOB SEARCH
                </p>
                <h2 className="text-4xl font-bold text-white tracking-tight leading-[1.2] mb-5">
                    Your job search,{" "}
                    <span className="text-white/70">organised and</span>{" "}
                    effortless.
                </h2>
                <p className="text-white/60 leading-relaxed">
                    Track every application, get AI feedback on your CV, and
                    generate tailored cover letters — all in one place.
                </p>
            </div>
        </div>
    )
}
