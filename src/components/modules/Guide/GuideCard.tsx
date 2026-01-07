/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Star, MapPin, CheckCircle, Users, MessageCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface GuideCardProps {
    guide: any;
}

export default function GuideCard({ guide }: GuideCardProps) {
    return (
        <Card className="group h-full hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-linear-to-b from-card/80 via-card/60 to-card/40">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="p-6 relative z-10">
                {/* Guide Header */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                        {/* Avatar with gradient ring */}
                        <div className="absolute -inset-2 bg-linear-to-r from-primary to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <Avatar className="h-20 w-20 border-4 border-white shadow-xl relative">
                            <AvatarImage
                                src={guide.profilePhoto}
                                className="group-hover:scale-105 transition-transform duration-500"
                            />
                            <AvatarFallback className="bg-linear-to-br from-primary to-pink-500 text-white text-xl">
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
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                            {guide.name || "Local Guide"}
                        </h3>
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">{guide.city || "Various Locations"}</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="text-center p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-bold">{guide.rating?.toFixed(1) || "5.0"}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                        <div className="font-bold text-lg mb-1">${guide.dailyRate || 50}</div>
                        <div className="text-xs text-muted-foreground">per day</div>
                    </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                    <div className="flex items-center justify-center flex-wrap gap-2 mb-3">
                        {guide.languages?.slice(0, 2).map((lang: string) => (
                            <Badge
                                key={lang}
                                variant="outline"
                                className="text-xs border-primary/20"
                            >
                                {lang}
                            </Badge>
                        ))}
                        {guide.languages?.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                                +{guide.languages.length - 2}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Expertise */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {guide.expertise?.slice(0, 3).map((exp: string) => (
                        <Badge
                            key={exp}
                            variant="secondary"
                            className="text-xs bg-linear-to-r from-primary/10 to-pink-500/10 text-primary"
                        >
                            {exp}
                        </Badge>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{guide.toursCompleted || 50}+ tours</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{guide.yearsExperience || 2}y exp</span>
                    </div>
                </div>

                {/* Bio */}
                {guide.bio && (
                    <div className="mt-4 pt-4 border-t border-primary/10">
                        <p className="text-sm text-muted-foreground text-center line-clamp-2">
                            {guide.bio}
                        </p>
                    </div>
                )}
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="p-6 pt-0">
                <div className="flex flex-col gap-3 w-full">
                    <Link href={`/guides/${guide.id}`} className="w-full">
                        <Button className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary hover:to-pink-500 hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Guide
                        </Button>
                    </Link>
                    <Link href={`/guides/${guide.id}`}>
                        <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/5">
                            View Full Profile
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}