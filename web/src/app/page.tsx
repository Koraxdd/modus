import CTASection from "@/components/features/landing/cta-section/CTASection"
import FeaturesSection from "@/components/features/landing/features-section/FeaturesSection"
import HeroSection from "@/components/features/landing/hero-section/HeroSection"
import PricingSection from "@/components/features/landing/pricing-section/PricingSection"
import Footer from "@/components/layout/landing/Footer"
import Header from "@/components/layout/landing/Header"

export default function LandingPage() {
    return (
        <>
            <Header />
            <HeroSection />
            <section className="flex items-center justify-center border-y border-border/60 bg-white dark:bg-[#141420] h-38 text-center py-10 px-6">
                <p className="text-xs text-zinc-400 dark:text-[#c8c8dc] font-medium tracking-widest">
                    DESIGNED TO TRACK APPLICATIONS FOR ROLES AT WORLD-CLASS TECH
                    COMPANIES
                </p>
            </section>
            <FeaturesSection />
            <div className="bg-foreground dark:bg-black h-38" />
            <PricingSection />
            <CTASection />
            <Footer />
        </>
    )
}
