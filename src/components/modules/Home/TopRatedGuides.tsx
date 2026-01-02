/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Temporary static images (replace later with API images)
import guide1 from "../../../assets/images/doctor-cardiologist.jpg";
import guide2 from "../../../assets/images/doctor-neurologist.jpg";
import guide3 from "../../../assets/images/doctor-orthopedic.jpg";

type Guide = {
  id: string;
  name: string;
  expertise: string;
  location: string;
  rating: number;
  reviews: number;
  image: any;
};

const guides: Guide[] = [
  {
    id: "1",
    name: "Rahim Uddin",
    expertise: "Heritage & Food Tour",
    location: "Old Dhaka",
    rating: 4.9,
    reviews: 128,
    image: guide1,
  },
  {
    id: "2",
    name: "Ayesha Khan",
    expertise: "Beach & Nature Guide",
    location: "Cox’s Bazar",
    rating: 4.8,
    reviews: 96,
    image: guide2,
  },
  {
    id: "3",
    name: "John Silva",
    expertise: "Tea Garden Explorer",
    location: "Sylhet",
    rating: 4.9,
    reviews: 74,
    image: guide3,
  },
];

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50/50 items-center p-6">
        <Image
          src={guide.image}
          alt={guide.name}
          width={96}
          height={96}
          className="rounded-full border-4 border-white shadow-md"
        />
      </CardHeader>

      <CardContent className="p-6">
        <CardTitle className="text-lg">{guide.name}</CardTitle>

        <p className="text-primary font-medium mt-1">
          {guide.expertise}
        </p>

        <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          {guide.location}
        </div>

        <div className="flex items-center justify-center my-3 text-sm">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-2 font-semibold">{guide.rating}</span>
          <span className="ml-2 text-muted-foreground">
            ({guide.reviews} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button variant="outline">View Profile</Button>
        <Button>Book Guide</Button>
      </CardFooter>
    </Card>
  );
};

const TopRatedGuides = () => {
  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Top Rated Local Guides
          </h2>
          <p className="text-muted-foreground mt-4">
            Discover highly rated, verified local guides trusted by travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">Explore All Guides</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedGuides;
