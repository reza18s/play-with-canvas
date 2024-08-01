/* eslint-disable react-hooks/exhaustive-deps */
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
  useAddEventListener: (
    type: "click" | "keydown" | "keyup" | "mousedown" | "mouseup" | "mousemove",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (event: any) => void,
  ) => {
    useEffect(() => {
      window.addEventListener(type, handler);
      return () => window.removeEventListener(type, handler);
    }, []);
  },
};
