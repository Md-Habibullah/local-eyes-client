import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTASection = () => {
    return (
        <section className="text-center py-20 bg-muted">
            <h2 className="text-3xl font-bold mb-4">
                Ready to Explore?
            </h2>
            <p className="text-muted-foreground mb-6">
                Join LocalEyes and start your journey today.
            </p>
            <Button asChild>
                <Link href="/register">Join Now</Link>
            </Button>
        </section>
    );
};

export default CTASection;
