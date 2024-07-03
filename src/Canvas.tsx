import { useEffect } from "react";

class Particle {
   x: number = 0;
   y: number = 0;
   size: number = 0;
   speedX: number = 0;
   speedY: number = 0;

   constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
   }
   update() {
      this.y += this.speedY;
      this.x += this.speedX;
      return this;
   }
   draw(ctx: CanvasRenderingContext2D | null | undefined) {
      ctx!.fillStyle = "red";
      ctx?.beginPath();
      ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx?.fill();
      return this;
   }
}

export default function Canvas({
   canv,
}: {
   canv: HTMLCanvasElement | null;
   setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
   const ctx = canv?.getContext("2d");
   const mouse = { x: canv!.width / 2, y: canv!.height / 2 };
   canv!.width = window.innerWidth;
   canv!.height = window.innerHeight;
   const particleArray: Particle[] = [];

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
   const init = () => {
      for (let i = 0; i < 100; i++) {
         particleArray.push(new Particle(mouse.x, mouse.y));
      }
   };
   init();
   function handelParticles() {
      particleArray?.map((cl) => {
         cl.update().draw(ctx);
      });
   }
   const animation = () => {
      ctx?.clearRect(0, 0, canv!.width, canv!.height);

      handelParticles();
      requestAnimationFrame(animation);
   };
   animation();
   return <></>;
}
