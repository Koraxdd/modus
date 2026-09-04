"use client"

import { useState } from "react"
import PricingSwitchMenu from "./PricingSwitchMenu"
import { tierCards } from "@/lib/pricing/tierCards"
import TierCard from "./TierCard"

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState<boolean>(false)

    return (
        <section className="py-28 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-primary mb-3 text-xs font-semibold tracking-wider">
                        PRICING
                    </p>
                    <h2 className="text-[40px] md:text-5xl font-bold tracking-tighter leading-[1.1]">
                        Simple, honest pricing
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                        Start free. Upgrade when you need more power.
                    </p>
                    <PricingSwitchMenu
                        isAnnual={isAnnual}
                        setIsAnnual={setIsAnnual}
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                    {tierCards.map((card) => (
                        <TierCard
                            key={card.title}
                            card={card}
                            isAnnual={isAnnual}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
