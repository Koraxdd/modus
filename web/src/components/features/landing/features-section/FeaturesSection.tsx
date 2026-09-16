import { featureCards } from "@/lib/cards/featureCards"
import FeatureCard from "./FeatureCard"

export default function FeaturesSection() {
    return (
        <section className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-primary mb-3 text-xs font-semibold tracking-wider">
                        FEATURES
                    </p>
                    <h2 className="text-[40px] md:text-5xl font-bold tracking-tighter leading-[1.1]">
                        Everything your job search needs
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                        From first application to signed offer, Modus keeps you
                        organised and one step ahead.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                    {featureCards.map((card) => (
                        <FeatureCard key={card.title} card={card} />
                    ))}
                </div>
            </div>
        </section>
    )
}
