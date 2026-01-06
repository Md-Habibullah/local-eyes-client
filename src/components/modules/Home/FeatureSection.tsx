const features = [
    {
        title: "Verified Guides",
        desc: "All guides are verified and reviewed.",
    },
    {
        title: "Secure Payments",
        desc: "SSLCommerz protected transactions.",
    },
    {
        title: "Flexible Booking",
        desc: "Easy cancellation and refunds.",
    },
];

const FeatureSection = () => {
    return (
        <section className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="border rounded-lg p-6"
                    >
                        <h3 className="font-semibold mb-2">{f.title}</h3>
                        <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;
