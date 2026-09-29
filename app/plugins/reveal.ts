/**
 * v-reveal: blendet Inhalte beim Scrollen sanft ein (leicht von unten).
 * Optionaler Wert = Verzögerung in ms, z. B. v-reveal="150" für gestaffelte Elemente.
 *
 * - Läuft per Web Animations API, kollidiert also nicht mit Tailwind-Transitions
 *   (z. B. Hover-Effekten) auf demselben Element.
 * - Was beim Laden schon sichtbar ist, bleibt einfach stehen (kein Aufblitzen).
 * - Ohne JavaScript oder bei „Bewegung reduzieren“ ist alles sofort sichtbar.
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>();

const EASE_SOFT = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number | undefined>("reveal", {
    getSSRProps: () => ({}),

    mounted(el, binding) {
      if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) return;

      el.style.opacity = "0";

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          observers.delete(el);

          el.style.opacity = "";
          el.animate(
            [
              { opacity: 0, transform: "translateY(20px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 1200,
              delay: binding.value ?? 0,
              easing: EASE_SOFT,
              fill: "backwards",
            },
          );
        },
        { rootMargin: "0px 0px -8% 0px" },
      );

      observer.observe(el);
      observers.set(el, observer);
    },

    unmounted(el) {
      observers.get(el)?.disconnect();
      observers.delete(el);
    },
  });
});
