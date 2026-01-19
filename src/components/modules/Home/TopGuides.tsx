/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, MapPin, CheckCircle, Languages, Sparkles, Users, Award, Calendar, Zap, Globe } from "lucide-react";
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
  const guides = guidesData.slice(0, 4); // Limit to top 4 guides for homepage

  // Handle empty guides array
  if (!guides || guides.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-pink-500/10 dark:from-primary/20 dark:to-pink-500/20 mb-6">
          <Sparkles className="h-12 w-12 text-primary dark:text-primary/80" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Meet Our Expert Guides</h3>
        <p className="text-muted-foreground dark:text-gray-400 max-w-md mx-auto mb-8">
          Passionate locals ready to share their cities with you.
        </p>
        <Link href="/become-a-guide">
          <Button className="gap-2 bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:scale-105 transition-all duration-300 text-white dark:from-primary/90 dark:to-pink-500/90">
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
    "h-full group hover:shadow-2xl transition-all duration-500 overflow-hidden relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
    guides.length === 1 ? "max-w-md" : "",
    guides.length === 3 && index === 1 ? "-translate-y-4 shadow-xl dark:shadow-gray-900/50" : ""
  );

  return (
    <div className={containerClass}>
      {/* Stats Overview Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">500+</div>
          <div className="text-sm text-blue-800/70 dark:text-blue-300/80">Expert Guides</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">4.9</div>
          <div className="text-sm text-amber-800/70 dark:text-amber-300/80">Avg Rating</div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">50+</div>
          <div className="text-sm text-emerald-800/70 dark:text-emerald-300/80">Countries</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">100%</div>
          <div className="text-sm text-purple-800/70 dark:text-purple-300/80">Verified</div>
        </div>
      </div>

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
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600 text-white border-none shadow-lg dark:shadow-gray-900/50">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Verified badge - Always show if verified */}
              {guide.isVerified && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white border-none shadow-lg dark:shadow-gray-900/50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              )}

              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-6 relative z-1">
                {/* Guide Header with Photo */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    {/* Avatar with gradient ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary to-pink-500 dark:from-primary/80 dark:to-pink-500/80 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-900 shadow-xl relative">
                      <AvatarImage
                        src={guide.profilePhoto}
                        className="group-hover:scale-105 transition-transform duration-500"
                        alt={`${guide.name}'s profile`}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-pink-500 dark:from-primary/90 dark:to-pink-500/90 text-white text-2xl">
                        {guide.name?.charAt(0) || "G"}
                      </AvatarFallback>
                    </Avatar>

                    {/* Online indicator */}
                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 shadow-lg border-2 border-white dark:border-gray-900">
                      <div className="h-3 w-3 rounded-full bg-white"></div>
                    </div>
                  </div>

                  {/* Name and Location */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300 text-gray-900 dark:text-gray-100">
                      {guide.name || "Local Guide"}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{guide.city || "Various Locations"}, </span>
                      <Globe className="h-3 w-3" />
                      <span>{guide.country || "Worldwide"}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 rounded-lg bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300 border border-primary/10 dark:border-primary/20">
                    <div className="font-bold text-2xl text-primary dark:text-primary/90 mb-1">
                      {guide.rating?.toFixed(1) || "5.0"}
                    </div>
                    <div className="flex justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < (guide.rating || 5)
                              ? "fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500"
                              : "fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-gray-500 mt-1">Rating</div>
                  </div>

                  <div className="text-center p-3 rounded-lg bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300 border border-primary/10 dark:border-primary/20">
                    <div className="font-bold text-2xl text-primary dark:text-primary/90 mb-1">
                      {guide.toursCompleted || 50}+
                    </div>
                    <div className="flex justify-center">
                      <Calendar className="h-3 w-3 text-muted-foreground dark:text-gray-500" />
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-gray-500 mt-1">Tours</div>
                  </div>

                  <div className="text-center p-3 rounded-lg bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300 border border-primary/10 dark:border-primary/20">
                    <div className="font-bold text-2xl text-primary dark:text-primary/90 mb-1">
                      ${guide.dailyRate || 50}
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-gray-500">per day</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Languages className="h-4 w-4 text-primary dark:text-primary/80" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Speaks</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {guide.languages?.slice(0, 3).map((lang: any) => (
                      <Badge
                        key={lang}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                      >
                        {lang}
                      </Badge>
                    ))}
                    {guide.languages && guide.languages.length > 3 && (
                      <Badge variant="outline" className="text-xs text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700">
                        +{guide.languages.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-primary dark:text-primary/80" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {guide.expertise?.slice(0, 3).map((exp: any) => (
                      <Badge
                        key={exp}
                        variant="secondary"
                        className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 border-primary/20 dark:border-primary/30"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                {guide.bio && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-muted-foreground dark:text-gray-400 text-center line-clamp-3">
                      {guide.bio}
                    </p>
                  </div>
                )}
              </CardContent>

              {/* Card Footer with gradient */}
              <CardFooter className="p-6 pt-0 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
                <Link href={`/guides/${guide.id}`} className="w-full">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-pink-500 dark:from-primary/90 dark:to-pink-500/90 dark:hover:from-primary dark:hover:to-pink-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-white dark:text-white/90"
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
              className="group bg-gradient-to-r from-transparent via-primary/5 to-transparent dark:via-primary/10 hover:shadow-xl border-primary/20 dark:border-primary/40 hover:border-primary/40 dark:hover:border-primary/60 transition-all duration-300"
            >
              <span className="bg-gradient-to-r from-primary to-pink-500 dark:from-primary/90 dark:to-pink-500/90 bg-clip-text text-transparent font-bold">
                Discover All Guides
              </span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300 text-primary dark:text-primary/80">→</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}