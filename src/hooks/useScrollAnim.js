import { useEffect, useRef } from 'react';

/**
 * useScrollAnim — attaches IntersectionObserver to the returned ref.
 * When the element enters the viewport, adds class "anim-in".
 * Elements styled with .anim-ready start at opacity:0 + translateY(30px).
 */
export default function useScrollAnim(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );

    // Observe the element itself and all .anim-ready children
    const children = el.querySelectorAll('.anim-ready');
    if (children.length > 0) {
      children.forEach((child) => observer.observe(child));
    } else {
      el.classList.add('anim-ready');
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
