import { notFound } from "next/navigation"
import { ArrowLeft, Mail, Phone, Globe, MapPin, Star, Calendar, Users, Award, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getGuideById } from "@/services/guide/getGuideById";
import Image from "next/image";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const guide = await getGuideById(id);

    return {
        title: `${guide?.name || 'Guide'} | Local Expert Guide`,
        description: guide?.bio || 'Expert local guide offering personalized tours and experiences.',
    };
}

export default async function GuideDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const guide = await getGuideById(id);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-primary/5 to-background">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <Link href="/guides">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Guides
                    </Button>
                </Link>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-linear-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Header with Background */}
                        <div className="relative h-48 bg-linear-to-r from-primary/30 to-pink-500/30">
                            <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px]" />
                        </div>

                        {/* Profile Section */}
                        <div className="relative px-8 pb-8 -mt-16">
                            {/* Profile Image & Basic Info */}
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="relative">
                                    <div className="relative">
                                        {guide.profilePhoto ? (
                                            <div className="h-20 w-20 rounded-full overflow-hidden relative">
                                                <Image
                                                    src={guide.profilePhoto}
                                                    alt={guide.name.charAt(0) || "G"}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                    priority={false}
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-20 w-20 rounded-full bg-linear-to-r from-primary to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                                                {guide.name?.charAt(0) || "G"}
                                            </div>
                                        )}
                                        {guide.isVerified && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                                <Shield className="h-3 w-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                                {guide.name || "Local Guide"}
                                            </h1>
                                            <div className="flex items-center gap-4 text-muted-foreground">
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {guide.address || "Various Cities"}, {guide.country || "Worldwide"}
                                                </div>
                                                <div className="flex items-center">
                                                    <Globe className="h-4 w-4 mr-1" />
                                                    {guide.languages?.join(", ") || "English"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                                            <div className="text-2xl font-bold text-primary">
                                                ${guide.dailyRate || 50}
                                                <span className="text-sm font-normal text-muted-foreground"> / hour</span>
                                            </div>
                                            <Button className="w-full mt-3 bg-linear-to-r from-primary to-pink-500 hover:shadow-lg">
                                                Book This Guide
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rating & Stats */}
                            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/10">
                                {guide.rating && (
                                    <div className="flex items-center">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${i < Math.floor(guide.rating || 0)
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-xl font-bold">
                                            {guide.rating.toFixed(1)}
                                        </span>
                                        <span className="ml-2 text-muted-foreground">
                                            ({guide.reviewCount || 0} reviews)
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="font-medium">{guide.toursCompleted || 150}+ Tours</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="font-medium">{guide.experienceYears || 3}+ Years</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="font-medium">Response: {guide.responseTime || "1 hour"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <Award className="h-6 w-6 mr-2 text-primary" />
                                About Me
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {guide.bio || "Passionate local guide with extensive knowledge and love for sharing the hidden gems of my city. I specialize in creating personalized experiences that go beyond typical tourist attractions."}
                            </p>
                        </div>

                        {/* Expertise Section */}
                        {guide.expertise && guide.expertise.length > 0 && (
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
                                <div className="flex flex-wrap gap-3">
                                    {guide.expertise.map((skill: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 rounded-full bg-linear-to-r from-primary/20 to-pink-500/20 border border-primary/30 text-primary font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Services Offered */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold mb-6">Services Offered</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "City Walking Tours",
                                    "Food & Culinary Experiences",
                                    "Historical & Cultural Tours",
                                    "Customized Private Tours",
                                    "Photography Tours",
                                    "Day Trips & Excursions"
                                ].map((service, index) => (
                                    <div key={index} className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                                            <Star className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & Info */}
                    <div className="space-y-8">
                        {/* Contact Card */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="font-bold text-lg mb-4">Contact Guide</h3>
                            <div className="space-y-4">
                                {guide.email && (
                                    <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10">
                                        <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                                        <span>{guide.email}</span>
                                    </div>
                                )}
                                {guide.phone && (
                                    <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10">
                                        <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                                        <span>{guide.phone}</span>
                                    </div>
                                )}
                            </div>
                            <Button className="w-full mt-6 bg-linear-to-r from-primary to-primary/80">
                                Send Message
                            </Button>
                        </div>

                        {/* Languages */}
                        {guide.languages && guide.languages.length > 0 && (
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <h3 className="font-bold text-lg mb-4">Languages</h3>
                                <div className="space-y-2">
                                    {guide.languages.map((lang: string, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                                            <span>{lang}</span>
                                            <span className="text-sm text-muted-foreground">Fluent</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Availability */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="font-bold text-lg mb-4">Availability</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Response Time</span>
                                    <span className="font-medium">{guide.responseTime || "Within 1 hour"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Availability</span>
                                    <span className="font-medium text-green-500">Available This Week</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Minimum Booking</span>
                                    <span className="font-medium">2 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="font-bold text-lg mb-4">Badges & Certifications</h3>
                            <div className="space-y-3">
                                {guide.isVerified && (
                                    <div className="flex items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <Shield className="h-5 w-5 mr-3 text-green-500" />
                                        <div>
                                            <div className="font-medium">Verified Guide</div>
                                            <div className="text-sm text-muted-foreground">Identity and background verified</div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <Award className="h-5 w-5 mr-3 text-blue-500" />
                                    <div>
                                        <div className="font-medium">Top Rated</div>
                                        <div className="text-sm text-muted-foreground">Consistently high ratings</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-pink-500/20 p-12">
                        <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready for an Unforgettable Experience?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Book {guide.name || "this guide"} now and discover the city through a local eyes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-linear-to-r from-primary to-pink-500 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Book This Guide
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary/30 hover:border-primary/50"
                                >
                                    Ask a Question
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}