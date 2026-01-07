"use client";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartbeatLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  showIcon?: boolean;
}

const SIZE_CLASSES = {
  sm: { container: "w-20 h-20", text: "text-xs", icon: 12 },
  md: { container: "w-32 h-32", text: "text-sm", icon: 16 },
  lg: { container: "w-48 h-48", text: "text-base", icon: 24 },
  xl: { container: "w-64 h-64", text: "text-lg", icon: 32 },
} as const;

export default function HeartbeatLoader({
  text = "Loading your travel experience...",
  size = "md",
  className = "",
  animated = true,
  showIcon = false,
}: HeartbeatLoaderProps) {
  const { container, text: textSize, icon: iconSize } = SIZE_CLASSES[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 justify-center min-h-[60vh]",
        className
      )}
    >
      <div className="relative">
        {/* Background glow effect */}
        {animated && (
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        )}

        {/* Outer pulsing rings */}
        {animated && (
          <>
            <div className="absolute -inset-2 animate-pulse rounded-full border-2 border-primary/30" />
            <div className="absolute -inset-4 animate-pulse rounded-full border border-primary/10" />
          </>
        )}

        {/* Main loader container */}
        <div
          className={cn(
            "relative",
            container,
            !animated && "no-animation"
          )}
        >
          {/* Outer ring with gradient */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/20" />

          {/* Animated ring */}
          {animated && (
            <div className="absolute inset-0 rounded-full border-[3px] border-primary animate-spin-slow animation-duration-[3s]" />
          )}

          {/* Inner container */}
          <div className="absolute inset-[15%] flex items-center justify-center">
            {showIcon ? (
              <div className={cn(
                "text-primary",
                animated && "animate-heartbeat"
              )}>
                <Activity size={iconSize} strokeWidth={2.5} />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <svg
                  className="w-full h-full"
                  style={{ transform: "scaleX(-1)" }}
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 58 58"
                >
                  <path
                    d="M52.744 28.7694H46.7983C45.7505 28.7672 44.7309 29.1082 43.8953 29.7403C43.0597 30.3724 42.4541 31.2609 42.1712 32.2697L36.5372 52.3124C36.5009 52.4369 36.4252 52.5463 36.3214 52.6241C36.2177 52.7019 36.0915 52.744 35.9618 52.744C35.8321 52.744 35.7059 52.7019 35.6022 52.6241C35.4984 52.5463 35.4227 52.4369 35.3864 52.3124L22.1525 5.22645C22.1162 5.10195 22.0404 4.99259 21.9367 4.91478C21.8329 4.83697 21.7068 4.79491 21.5771 4.79491C21.4474 4.79491 21.3212 4.83697 21.2175 4.91478C21.1137 4.99259 21.038 5.10195 21.0017 5.22645L15.3677 25.2692C15.0859 26.2741 14.4839 27.1596 13.6532 27.7913C12.8224 28.423 11.8082 28.7665 10.7646 28.7694H4.79491"
                    stroke="url(#gradient)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className={animated ? "animate-draw-path" : ""}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text with gradient */}
      {text && (
        <div className="relative">
          <p
            className={cn(
              "font-medium text-center bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
              textSize,
              animated && "animate-fade-in-up"
            )}
          >
            {text}
          </p>
          {animated && (
            <div className="absolute -bottom-1 left-1/2 h-px w-32 -translate-x-1/2 bg-linear-to-r from-transparent via-primary to-transparent animate-pulse" />
          )}
        </div>
      )}

      {/* Add these styles to your global CSS */}
      <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                @keyframes draw-path {
                    0% { stroke-dashoffset: 500; }
                    100% { stroke-dashoffset: 0; }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow linear infinite;
                }

                .animate-heartbeat {
                    animation: heartbeat 1.5s ease-in-out infinite;
                }

                .animate-draw-path {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                    animation: draw-path 2s ease-in-out infinite;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out 0.5s both;
                }

                .no-animation .animate-draw-path {
                    stroke-dashoffset: 0;
                }
            `}</style>
    </div>
  );
}