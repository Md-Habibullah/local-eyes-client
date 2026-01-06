const steps = [
    "Choose a tour",
    "Book with confidence",
    "Enjoy the experience",
];

const HowItWorks = () => {
    return (
        <section className="text-center">
            <h2 className="text-3xl font-bold mb-10">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-6 w-64"
                    >
                        <p className="text-lg font-semibold mb-2">
                            Step {i + 1}
                        </p>
                        <p className="text-muted-foreground">{step}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
