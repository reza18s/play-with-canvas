import { useEffect } from "react";

export default function Canvas({
   canv,
   setCanv,
}: {
   canv: HTMLCanvasElement | null;
   setCanv: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
   const ctx = canv?.getContext("2d");
   const mouse = { x: 0, y: 0 };
   canv!.width = window.innerWidth;
   canv!.height = window.innerHeight;
   const createCircle = (x = 130, y = 100) => {
      ctx!.fillStyle = "red";
      ctx?.beginPath();
      ctx?.arc(x, y, 10, 0, Math.PI * 2);
      ctx?.fill();
   };

   useEffect(() => {
      const clickHandler = (event: MouseEvent) => {
         mouse.x = event.x;
         mouse.y = event.y;
         createCircle(mouse.x, mouse.y);
      };
      addEventListener("click", clickHandler);
      return () => document.removeEventListener("click", clickHandler);
   }, []);
   createCircle();
   return <></>;
}
