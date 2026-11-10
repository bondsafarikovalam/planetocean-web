import type Lenis from "lenis";

/** The page-wide Lenis instance (null on reduced motion, before mount, or during SSR). */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Scroll the window to `top`, going through Lenis when it is driving the page. */
export function scrollToY(top: number, opts: { immediate?: boolean } = {}) {
  if (instance) {
    instance.scrollTo(top, { immediate: opts.immediate, force: true });
  } else {
    window.scrollTo({ top, left: 0, behavior: opts.immediate ? "instant" : "smooth" });
  }
}
