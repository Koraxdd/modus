import HeroSection from "@/components/features/landing/HeroSection"
import Header from "@/components/layout/Header"

export default function LandingPage() {
    return (
        <>
            <Header />
            <div className="relative pt-36 pb-20 px-6">
                <div className="absolute inset-0 bg-sphere pointer-events-none" />
                <div className="absolute inset-0 bg-grid pointer-events-none" />
                <div className="flex flex-col items-center max-w-6xl mx-auto">
                    <HeroSection />
                </div>
            </div>
        </>
    )
}
