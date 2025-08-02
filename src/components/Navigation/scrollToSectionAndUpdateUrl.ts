export function scrollToSectionAndUpdateUrl(section: HTMLElement, id: string) {
   section.scrollIntoView({ behavior: "smooth", block: "start" });

   const observer = new IntersectionObserver(
      ([entry], obs) => {
         if (entry.isIntersecting) {
            const url = new URL(window.location.href);
            url.searchParams.set("section", id);
            window.history.replaceState({}, "", url);
            obs.disconnect();
         }
      },
      { threshold: 0.5 },
   );

   observer.observe(section);
}
