import { cn, seeded } from "@/lib/utils";

/**
 * Lightweight CSS-only underwater effects (no JS, no WebGL).
 * Values are generated from a fixed seed so server and client markup match.
 */

const rand = seeded(7);
const BUBBLES = Array.from({ length: 22 }, (_, i) => {
  const size = 3 + Math.round(rand() * 9);
  return {
    id: i,
    left: `${Math.round(rand() * 100)}%`,
    size,
    duration: 11 + Math.round(rand() * 16),
    delay: -Math.round(rand() * 24),
    dx: `${Math.round(rand() * 60 - 30)}px`,
    opacity: (0.25 + rand() * 0.45).toFixed(2),
  };
});

export function Bubbles({ className, count = 22 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden className={cn("motion-hide pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {BUBBLES.slice(0, count).map((b) => (
        <span
          key={b.id}
          className="absolute -bottom-6 rounded-full border border-seafoam/50 bg-seafoam/10 animate-rise"
          style={
            {
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--dx": b.dx,
              "--o": b.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

const RAYS = [
  { left: "8%", width: "14%", r: "-14deg", delay: "0s", dur: "13s" },
  { left: "26%", width: "8%", r: "-10deg", delay: "-4s", dur: "16s" },
  { left: "44%", width: "18%", r: "-16deg", delay: "-8s", dur: "19s" },
  { left: "66%", width: "9%", r: "-12deg", delay: "-2s", dur: "15s" },
  { left: "80%", width: "13%", r: "-18deg", delay: "-6s", dur: "21s" },
];

/** Soft, slowly swaying shafts of light from the surface. */
export function LightRays({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {RAYS.map((r, i) => (
        <span
          key={i}
          className="absolute -top-[10%] h-[120%] origin-top animate-sway will-change-transform [mask-image:linear-gradient(90deg,transparent,#000_40%,#000_60%,transparent)]"
          style={
            {
              left: r.left,
              width: r.width,
              background: "linear-gradient(180deg, rgb(184 238 229 / 0.38) 0%, rgb(66 214 196 / 0.08) 55%, transparent 85%)",
              animationDelay: r.delay,
              animationDuration: r.dur,
              "--r": r.r,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
