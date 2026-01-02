import { Search, UserCheck, CalendarCheck, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Guides",
    description: "Search local guides by city, language and expertise.",
  },
  {
    icon: UserCheck,
    title: "View Verified Profiles",
    description: "Every guide is identity-verified and reviewed.",
  },
  {
    icon: CalendarCheck,
    title: "Book Securely",
    description: "Choose your date and book with secure payment.",
  },
  {
    icon: Star,
    title: "Explore & Review",
    description: "Enjoy your experience and leave a review.",
  },
];

const Steps = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">How LocalEyes Works</h2>
          <p className="text-muted-foreground mt-4">
            A simple, trusted process to explore with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-muted/50 hover:shadow-md transition"
            >
              <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
                <step.icon size={28} />
              </div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
