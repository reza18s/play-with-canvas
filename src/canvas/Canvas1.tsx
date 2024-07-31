import { useEffect } from "react";
import { Hooks } from "../Hooks";

class Particle {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speedX: number = 0;
  speedY: number = 0;
  collusion: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 100 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.x < 0 || this.x > window.innerWidth) {
      this.speedX = this.speedX * -1;
    }
    if (this.y < 0 || this.y > window.innerHeight) {
      this.speedY = this.speedY * -1;
    }
    if (this.size > 0.2) {
      this.size += -0.09;
    }
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx!.fillStyle = `hsl(${hue},100%,50%)`;
    ctx?.beginPath();
    ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx?.fill();
    return this;
  }
  reverse(speedX: number, speedY: number) {
    this.speedX = this.speedX * -1;
    this.speedY = this.speedY * -1;
  }
}

export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  const ctx = canv?.getContext("2d");
  const mouse = {
    x: canv!.width,
    y: canv!.height,
  };
  let hue = 0;
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  const particleArray: Particle[] = [];

  Hooks.Resize(canv);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
      particleArray.push(new Particle(mouse.x, mouse.y));
    };
    addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
      particleArray.push(new Particle(mouse.x, mouse.y));
    };
    addEventListener("mousemove", clickHandler);
    return () => document.removeEventListener("mousemove", clickHandler);
  }, []);
  // const init = () => {
  //    for (let i = 0; i < 100; i++) {
  //       particleArray.push(new Particle(mouse.x, mouse.y));
  //    }
  // };
  // init();
  function handelParticles() {
    particleArray?.map((cl, index) => {
      cl.update().draw(ctx, hue);
      if (cl.size <= 0.3) {
        particleArray.splice(index, 1);
      }
      // particleArray.map((cls) => {
      //    const distent = Math.sqrt(
      //       (cl.x - cls.x) * (cl.x - cls.x) +
      //          (cl.y - cls.y) * (cl.y - cls.y),
      //    );
      //    if (distent == 0) return;

      //    const radius = cl.size + cls.size;
      //    if (distent > radius + 10) {
      //       cl.collusion = false;
      //       cls.collusion = false;
      //    }
      //    if (cl.collusion || cls.collusion) return;
      //    if (distent < radius) {
      //       cl.collusion = true;
      //       cls.collusion = true;
      //       const clxy = [cl.speedX, cl.speedY];
      //       cl.reverse(cls.speedX, cls.speedY);
      //       cls.reverse(clxy[0], clxy[0]);
      //    }
      // });
    });
  }
  const animation = () => {
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    ctx!.fillStyle = "rgba(0,0,0,0.05)";
    ctx?.fillRect(0, 0, canv!.width, canv!.height);
    handelParticles();
    hue++;
    requestAnimationFrame(animation);
  };
  animation();
  return <></>;
}
