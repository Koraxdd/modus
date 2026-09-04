import FeaturesSection from "@/components/features/landing/features-section/FeaturesSection"
import HeroSection from "@/components/features/landing/hero-section/HeroSection"
import PricingSection from "@/components/features/landing/pricing-section/PricingSection"
import Header from "@/components/layout/Header"

export default function LandingPage() {
    return (
        <>
            <Header />
            <HeroSection />
            <section className="flex items-center justify-center border-y border-border/60 bg-white h-38 text-center py-10 px-6">
                <p className="text-xs text-zinc-400 font-medium tracking-widest">
                    DESIGNED TO TRACK APPLICATIONS FOR ROLES AT WORLD-CLASS TECH
                    COMPANIES
                </p>
            </section>
            <FeaturesSection />
            <div className="bg-foreground h-38" />
            <PricingSection />
        </>
    )
}
