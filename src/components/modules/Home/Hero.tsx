"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import localGuidesImg from "@/assets/images/local-guides.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.25),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.25),transparent_40%)]" />

      <div className="relative container mx-auto px-4 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — CONTENT */}
          <div>
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 mb-8">
              <ShieldCheck size={16} className="text-blue-400" />
              Verified Local Guides
            </div>

            {/* heading */}
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              Travel like a local,
              <br />
              <span className="text-blue-400">not like a tourist</span>
            </h1>

            {/* description */}
            <p className="mt-6 max-w-xl text-lg text-white/70">
              LocalEyes connects you with trusted local guides who help you
              discover authentic places, real culture, and hidden experiences —
              safely and confidently.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 hover:bg-white/10 hover:text-white/80">
                Explore Experiences
                <ArrowRight size={18} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-neutral-950/80 backdrop-blur text-white hover:bg-white/10 hover:text-white/80"
              >
                Become a Guide
              </Button>
            </div>

            {/* trust stats */}
            <div className="mt-16 flex flex-wrap gap-10 text-sm text-white/70">
              <div>
                <p className="text-xl font-semibold text-white">25K+</p>
                <p>Happy travelers</p>
              </div>

              <div>
                <p className="text-xl font-semibold text-white">1,200+</p>
                <p>Verified guides</p>
              </div>

              <div className="flex items-center gap-2">
                <Star
                  className="text-yellow-400 fill-yellow-400"
                  size={18}
                />
                <div>
                  <p className="text-xl font-semibold text-white">4.9/5</p>
                  <p>Average rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-3xl" />
            <Image
              src={localGuidesImg}
              alt="Local guides helping travelers"
              priority
              className="relative rounded-3xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
