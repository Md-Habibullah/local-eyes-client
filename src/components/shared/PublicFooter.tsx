import Link from "next/link";
import { MapPin, Globe, ShieldCheck, Heart, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const PublicFooter = () => {
  return (
    <footer className="relative border-t border-border bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_90%,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/10 rounded-full blur-sm" />
                <MapPin className="relative h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Local<span className="text-primary">Eyes</span>
              </h3>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Connect with trusted local guides worldwide to discover authentic places,
              real culture, and hidden experiences — travel like a local, not like a tourist.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Verified Guides</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-sm font-medium">
                <Globe className="h-4 w-4 text-primary" />
                <span>50+ Countries</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {[
            {
              title: "Explore",
              links: ["Destinations", "Local Experiences", "City Guides", "Adventure Tours", "Food & Culture"]
            },
            {
              title: "Company",
              links: ["About Us", "How It Works", "Become a Guide", "Careers", "Press"]
            },
            {
              title: "Support",
              links: ["Help Center", "Safety", "Terms", "Privacy", "Contact"]
            }
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LocalEyes. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive animate-pulse" />
            <span>for travelers</span>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Youtube, label: "YouTube" }
            ].map((social) => (
              <Link
                key={social.label}
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;