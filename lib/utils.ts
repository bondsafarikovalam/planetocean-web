type ClassValue = string | number | false | null | undefined;

/** Minimal className joiner. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Deterministic pseudo-random generator, so SSR and client markup match. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
