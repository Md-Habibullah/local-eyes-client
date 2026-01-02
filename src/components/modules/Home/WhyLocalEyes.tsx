import { BadgeCheck, Lock, Star } from "lucide-react";

const items = [
    {
        icon: BadgeCheck,
        title: "Verified Identity",
        description: "Every guide goes through ID verification.",
    },
    {
        icon: Star,
        title: "Real Reviews",
        description: "Only real travelers can leave reviews.",
    },
    {
        icon: Lock,
        title: "Secure Payments",
        description: "Your booking and payments are protected.",
    },
];

const WhyLocalEyes = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <div key={i} className="text-center">
                            <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
                                <item.icon size={28} />
                            </div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyLocalEyes;
