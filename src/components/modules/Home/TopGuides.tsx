/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, MapPin, CheckCircle, Languages, Sparkles, Users, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getGuides } from "@/services/guide/getGuides";

export default async function TopGuides() {
  // Fetch guides on the server
  const guidesData = await getGuides();
  const guides = guidesData.slice(0, 3); // Limit to top 4 guides for homepage

  // Handle empty guides array
  if (!guides || guides.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-br from-primary/10 to-pink-500/10 mb-6">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Meet Our Expert Guides</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Passionate locals ready to share their cities with you.
        </p>
        <Link href="/become-a-guide">
          <Button className="gap-2 bg-linear-to-r from-primary to-pink-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <Users className="h-4 w-4" />
            Become a Guide
          </Button>
        </Link>
      </div>
    );
  }

  // Determine layout based on guide count
  const getGridClass = () => {
    if (guides.length === 1) return "flex justify-center";
    if (guides.length === 2) return "grid md:grid-cols-2 gap-8 justify-center";
    if (guides.length === 3) return "grid md:grid-cols-3 gap-8 justify-center";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
  };

  const containerClass = cn(
    "space-y-8",
    guides.length <= 3 ? "max-w-6xl mx-auto" : ""
  );

  const cardClass = (index: number) => cn(
    "h-full group hover:shadow-2xl transition-all duration-500 overflow-hidden relative",
    guides.length === 1 ? "max-w-md" : "",
    guides.length === 3 && index === 1 ? "-translate-y-4 shadow-xl" : ""
  );

  return (
    <div className={containerClass}>
      <div className={getGridClass()}>
        {guides.map((guide: any, index: any) => (
          <div
            key={guide.id}
            className={guides.length === 1 ? "w-full max-w-md" : ""}
          >
            <Card className={cardClass(index)}>
              {/* Premium badge for middle card in 3-card layout */}
              {guides.length === 3 && index === 1 && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-linear-to-r from-amber-500 to-yellow-500 text-white border-none shadow-lg">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-6 relative z-1">
                {/* Guide Header with Photo */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    {/* Avatar with gradient ring */}
                    <div className="absolute -inset-2 bg-linear-to-r from-primary to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl relative">
                      <AvatarImage
                        src={guide.profilePhoto}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <AvatarFallback className="bg-linear-to-br from-primary to-pink-500 text-white text-2xl">
                        {guide.name?.charAt(0) || "G"}
                      </AvatarFallback>
                    </Avatar>

                    {/* Verified badge */}
                    {guide.isVerified && (
                      <div className="absolute bottom-0 right-0 bg-linear-to-r from-green-500 to-emerald-500 rounded-full p-1.5 shadow-lg border-2 border-white">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Name and Location */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                      {guide.name || "Local Guide"}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{guide.city || "Various Locations"}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                    <div className="font-bold text-2xl text-primary mb-1">
                      {guide.rating?.toFixed(1) || "5.0"}
                    </div>
                    <div className="flex justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < (guide.rating || 5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-300 text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Rating</div>
                  </div>

                  <div className="text-center p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                    <div className="font-bold text-2xl text-primary mb-1">
                      {guide.toursCompleted || 50}+
                    </div>
                    <div className="flex justify-center">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Tours</div>
                  </div>

                  <div className="text-center p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                    <div className="font-bold text-2xl text-primary mb-1">
                      ${guide.dailyRate || 50}
                    </div>
                    <div className="text-xs text-muted-foreground">per day</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Languages className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Speaks</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {guide.languages?.slice(0, 3).map((lang: any) => (
                      <Badge
                        key={lang}
                        className="bg-linear-to-r from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        {lang}
                      </Badge>
                    ))}
                    {guide.languages && guide.languages.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{guide.languages.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {guide.expertise?.slice(0, 3).map((exp: any) => (
                      <Badge
                        key={exp}
                        variant="secondary"
                        className="bg-linear-to-r from-primary/10 to-pink-500/10 text-primary border-primary/20"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                {guide.bio && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center line-clamp-3">
                      {guide.bio}
                    </p>
                  </div>
                )}
              </CardContent>

              {/* Card Footer with gradient */}
              <CardFooter className="p-6 pt-0 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                <Link href={`/guides/${guide.id}`} className="w-full">
                  <Button
                    className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary hover:to-pink-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-white"
                    size="lg"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* View All Button with animation */}
      {guides.length > 0 && (
        <div className="text-center pt-8">
          <Link href="/guides">
            <Button
              size="lg"
              variant="outline"
              className="group bg-linear-to-r from-transparent via-primary/5 to-transparent hover:shadow-xl border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent font-bold">
                Discover All Guides
              </span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}