import { useEffect } from "react";

export function useBodyLock(locked: boolean) {
   useEffect(() => {
      document.body.style.overflow = locked ? "hidden" : "";
      document.body.style.height = locked ? "100vh" : "";

      return () => {
         document.body.style.overflow = "";
         document.body.style.height = "";
      };
   }, [locked]);
}
