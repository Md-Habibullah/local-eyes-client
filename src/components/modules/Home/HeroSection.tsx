import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section className="py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Tours with Trusted Local Guides
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Book authentic travel experiences guided by locals.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild>
                    <Link href="/register">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/tours">Browse Tours</Link>
                </Button>
            </div>
        </section>
    );
};

export default HeroSection;
