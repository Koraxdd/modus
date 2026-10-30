import { prisma } from "../src/lib/prisma"

async function main() {
    const demoUser = await prisma.user.findUnique({
        where: { email: "demo@gmail.com" },
    })

    if (!demoUser) return

    await prisma.job.deleteMany({ where: { userId: demoUser.id } })

    await prisma.job.createMany({
        data: [
            {
                userId: demoUser.id,
                company: "Octopus Energy",
                role: "Junior Software Engineer",
                status: "saved",
                location: "London (Hybrid)",
                salary: "£40-50k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Cloudflare",
                role: "Graduate Software Engineer",
                status: "saved",
                location: "Remote (UK)",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Spotify",
                role: "Backend Engineer",
                status: "saved",
                location: "Remote (EU)",
                salary: "€55-65k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Monzo",
                role: "Backend Engineer",
                status: "applied",
                location: "London",
                salary: "£50-60k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Wise",
                role: "Full-Stack Engineer",
                status: "applied",
                location: "London",
                salary: "£55-65k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Deliveroo",
                role: "Junior Full-Stack Developer",
                status: "applied",
                location: "London (Hybrid)",
                salary: "£45-55k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Stripe",
                role: "Software Engineer",
                status: "interviewing",
                location: "Remote (UK)",
                salary: "£70-85k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Vercel",
                role: "Full-Stack Engineer",
                status: "interviewing",
                location: "Remote",
                salary: "$100-130k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "GitHub",
                role: "Software Engineer",
                status: "interviewing",
                location: "Remote (UK)",
                salary: "£60-70k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Revolut",
                role: "Backend Engineer",
                status: "offer",
                location: "London",
                salary: "£60-70k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Shopify",
                role: "Junior Developer",
                status: "rejected",
                location: "Remote",
                salary: "$80-95k",
                color: "#F59E0B",
            },
            {
                userId: demoUser.id,
                company: "Canva",
                role: "Full-Stack Engineer",
                status: "rejected",
                color: "#F59E0B",
            },
        ],
    })
}

main()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
