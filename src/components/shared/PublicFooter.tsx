import Link from "next/link";
import { MapPin, Globe, ShieldCheck, Heart } from "lucide-react";
// import { Button } from "../ui/button";

const PublicFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_90%,rgba(59,130,246,0.05),transparent_40%)]" />
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-7 w-7 text-blue-400" />
                <h3 className="text-xl font-semibold">
                  Local<span className="text-blue-400">Eyes</span>
                </h3>
              </div>
              <p className="mt-4 max-w-md text-sm text-white/60 leading-relaxed">
                Connect with trusted local guides worldwide to discover authentic places,
                real culture, and hidden experiences — travel like a local, not like a tourist.
              </p>

              <div className="mt-6 flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-blue-400" />
                  <span>Verified Guides</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span>50+ Countries</span>
                </div>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-medium mb-4 text-white">Explore</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Local Experiences</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">City Guides</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Adventure Tours</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Food & Culture</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-medium mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Become a Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-medium mb-4 text-white">Support</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Safety</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div className="mt-14 pt-8 border-t border-white/10">
            <div className="max-w-md">
              <h4 className="font-medium mb-3">Join our travel community</h4>
              <p className="text-sm text-white/60 mb-4">
                Get insider tips, local stories, and exclusive offers in your inbox.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400/30"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div> */}

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <div>
              © {new Date().getFullYear()} LocalEyes. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-400 fill-red-400" />
              <span>for travelers</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;