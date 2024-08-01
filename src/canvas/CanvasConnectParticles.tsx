import { useEffect } from "react";
import { Hooks } from "../Hooks";

export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  const mouse = {
    x: 0,
    y: 0,
    radius: 300,
  };
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  Hooks.Resize(canv);
  //  useEffect(() => {
  //     const clickHandler = (event: MouseEvent) => {
  //        mouse.x = event.x;
  //        mouse.y = event.y;
  //     };
  //     addEventListener("click", clickHandler);
  //     return () => document.removeEventListener("click", clickHandler);
  //  }, []);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      mouse.x = event.x + canv!.clientLeft / 2;
      mouse.y = event.y + canv!.clientTop / 2;
    };
    addEventListener("mousemove", clickHandler);
    return () => document.removeEventListener("mousemove", clickHandler);
  }, []);

  class Particle {
    x: number = 0;
    y: number = 0;
    size: number = 0;
    destiny: number = 0;
    color: string;
    speedX: number = 0;
    speedY: number = 0;

    constructor(color: string, size: number) {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.color = color;
      this.size = Math.random() * 5 + 1;
      this.destiny = Math.random() * 10 + 2;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
      ctx!.fillStyle = this.color;
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = 300;
      let force = (maxDistance - distance) / maxDistance;
      if (force > 1) force = 0;
      const directionX = forceDirectionX * force * this.destiny;
      const directionY = forceDirectionY * force * this.destiny;
      // console.log(directionX, directionY);
      if (distance < mouse.radius + this.size) {
        this.x -= directionX;
        this.y -= directionY;
      }
      this.draw();
      return this;
    }
    move() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.x < 0 && this.speedX < 0) {
        this.speedX = this.speedX * -1;
      }
      if (this.x > window.innerWidth && this.speedX > 0) {
        this.speedX = this.speedX * -1;
      }
      if (this.y < 0 && this.speedY < 0) {
        this.speedY = this.speedY * -1;
      }
      if (this.y > window.innerHeight && this.speedY > 0) {
        this.speedY = this.speedY * -1;
      }
      return this;
    }
    connect(x: number, y: number, defaultAlpha?: number) {
      const dx = x - this.x;
      const dy = y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;
      let alpha = (maxDistance - distance) / maxDistance;

      if (alpha > 1) alpha = 0;
      this.drawLine(x, y, defaultAlpha || alpha);
      return this;
    }

    draw() {
      ctx?.beginPath();
      ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx?.closePath();
      ctx?.fill();
      return this;
    }
    drawLine(x: number, y: number, alpha: number) {
      ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx?.beginPath(); // Start a new path
      ctx?.moveTo(x, y); // Move the pen to (30, 50)
      ctx?.lineTo(this.x, this.y); // Draw a line to (150, 100)
      ctx?.stroke(); // Render the path
    }
  }
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    const ParticleArray: Particle[] = [];
    const redParticleArray: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      ParticleArray.push(new Particle("white", 5));
      redParticleArray.push(new Particle("red", 5));
    }
    const animation = () => {
      ctx?.clearRect(0, 0, canv!.width, canv!.height);
      ctx!.fillStyle = "rgba(0,0,0,0.05)";
      ctx?.fillRect(0, 0, canv!.width, canv!.height);
      ParticleArray.map((el) => {
        el.update().move().connect(mouse.x, mouse.y);
        ParticleArray.map((ele) => {
          el.connect(ele.x, ele.y);
        });
      });
      redParticleArray.map((el) => {
        el.update().move().connect(mouse.x, mouse.y);
        redParticleArray.map((ele) => {
          el.connect(ele.x, ele.y);
        });
      });

      requestAnimationFrame(animation);
    };
    animation();
  };
  return <></>;
}
