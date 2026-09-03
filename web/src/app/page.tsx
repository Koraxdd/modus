import FeaturesSection from "@/components/features/landing/features/FeaturesSection"
import HeroSection from "@/components/features/landing/hero/HeroSection"
import Header from "@/components/layout/Header"

export default function LandingPage() {
    return (
        <>
            <Header />
            <HeroSection />
            <div className="border-y border-border/60 bg-white w-full h-38" />
            <FeaturesSection />
        </>
    )
}
