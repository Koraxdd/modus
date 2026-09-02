import Header from "@/components/layout/Header"

export default function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 bg-sphere pointer-events-none" />
            <div className="absolute inset-0 bg-grid" />
            <Header />
            <div className="min-h-screen flex flex-col justify-center items-center"></div>
        </>
    )
}
