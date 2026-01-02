import { ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import guideImg from "@/assets/images/hero-doctor.jpg";

const guides = [
  {
    name: "Rahim Uddin",
    location: "Old Dhaka",
    rating: 4.9,
    reviews: 120,
  },
  {
    name: "Ayesha Khan",
    location: "Cox’s Bazar",
    rating: 5.0,
    reviews: 98,
  },
  {
    name: "John Silva",
    location: "Sylhet",
    rating: 4.8,
    reviews: 76,
  },
];

const VerifiedGuides = () => {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Verified Local Guides</h2>
          <p className="text-muted-foreground mt-4">
            Trusted by thousands of travelers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {guides.map((guide) => (
            <div
              key={guide.name}
              className="bg-background p-6 rounded-xl shadow-sm text-center"
            >
              <Image
                src={guideImg}
                alt={guide.name}
                width={96}
                height={96}
                className="rounded-full mx-auto"
              />

              <h3 className="font-semibold mt-4">{guide.name}</h3>
              <p className="text-sm text-muted-foreground">{guide.location}</p>

              <div className="flex justify-center items-center gap-1 mt-2">
                <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
                <span className="font-medium">{guide.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({guide.reviews})
                </span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-600">
                <ShieldCheck size={16} /> Verified Guide
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedGuides;
