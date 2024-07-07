import { useEffect } from "react";

export const Hooks = {
  Resize: (canv: HTMLCanvasElement | null) => {
    useEffect(() => {
      const resizeHandler = () => {
        canv!.width = window.innerWidth;
        canv!.height = window.innerHeight;
      };
      window.addEventListener("resize", resizeHandler);

      return () => window.removeEventListener("resize", resizeHandler);
    }, []);
  },
};
