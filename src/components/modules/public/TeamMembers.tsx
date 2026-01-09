import { Github, Linkedin, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const team = [
    {
        name: "Alex Morgan",
        role: "Founder & CEO",
        bio: "Former travel journalist turned entrepreneur",
        image: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        social: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Maria Chen",
        role: "Head of Guides",
        bio: "10+ years in sustainable tourism",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        social: {
            linkedin: "#",
            github: "#",
            website: "#"
        }
    },
    {
        name: "David Park",
        role: "CTO",
        bio: "Previously at major travel tech companies",
        image: "https://images.unsplash.com/photo-1686063165043-45243dab25ab?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        social: {
            linkedin: "#",
            github: "#",
            website: "#"
        }
    },
    {
        name: "Sarah Johnson",
        role: "Community Lead",
        bio: "Built communities for multiple travel startups",
        image: "https://plus.unsplash.com/premium_photo-1661594757791-d8600f85f489?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        social: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    }
];

export default function TeamMembers() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
                <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
                >
                    <div className="aspect-square relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent z-10" />
                        {member.image ? (
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority={index < 2} // Only prioritize first 2 images
                            />
                        ) : (
                            <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center rounded-full font-semibold">
                                {member?.name.charAt(0).toUpperCase() ||
                                    "U"}
                            </div>
                        )}

                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                        <div className="flex items-center gap-3">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            {member.social.github && (
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                    <Github className="h-4 w-4" />
                                </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Globe className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}