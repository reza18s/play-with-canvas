import { useEffect, useState } from "react";

export default function Canvas({
   canv,
}: {
   canv: HTMLCanvasElement | null;
   setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
   const ctx = canv?.getContext("2d");
   const mouse = { x: 0, y: 0 };
   canv!.width = window.innerWidth;
   canv!.height = window.innerHeight;
   const createCircle = () => {
      ctx!.fillStyle = "red";
      ctx?.beginPath();
      ctx?.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx?.fill();
   };
   const animation = () => {
      ctx?.clearRect(0, 0, canv!.width, canv!.height);
      createCircle();

      requestAnimationFrame(animation);
   };
   animation();

   useEffect(() => {
      const resizeHandler = () => {
         canv!.width = window.innerWidth;
         canv!.height = window.innerHeight;
      };
      window.addEventListener("resize", resizeHandler);

      return () => window.removeEventListener("resize", resizeHandler);
   }, []);

   useEffect(() => {
      const clickHandler = (event: MouseEvent) => {
         mouse.x = event.x;
         mouse.y = event.y;
         createCircle();
      };
      addEventListener("click", clickHandler);
      return () => document.removeEventListener("click", clickHandler);
   }, []);
   useEffect(() => {
      const clickHandler = (event: MouseEvent) => {
         mouse.x = event.x;
         mouse.y = event.y;
      };
      addEventListener("mousemove", clickHandler);
      return () => document.removeEventListener("mousemove", clickHandler);
   }, []);
   createCircle();
   return <></>;
}
