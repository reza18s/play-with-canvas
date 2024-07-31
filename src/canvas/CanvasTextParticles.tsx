import { useEffect } from "react";
import { base64url } from "../context";
import { Hooks } from "../Hooks";

export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  const userImage = new Image();
  userImage.src = base64url;
  const mouse = {
    x: 0,
    y: 0,
    radius: 50,
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

  userImage.onload = function () {
    drawImage();
  };
  const drawImage = () => {
    ctx!.fillStyle = "white";
    ctx!.font = "150px verdana";
    ctx?.fillText("Fuck U", 0, 150);
    const data = ctx?.getImageData(0, 0, ctx.measureText("Fuck U").width, 150);
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      baseX: number = 0;
      baseY: number = 0;
      destiny: number = 0;
      color: string;
      speedX: number = 0;
      speedY: number = 0;

      constructor(x: number, y: number, color: string, size: number) {
        this.x = window.innerWidth / 2 + x;
        this.y = window.innerHeight / 2 + y;
        this.color = color;
        this.size = size;
        this.baseX = x + window.innerWidth / 2;
        this.baseY = window.innerHeight / 2 + y;
        this.destiny = Math.random() * 10 + 2;
        this.speedX = 1.5;
        this.speedY = 1.5;
      }
      update() {
        ctx!.fillStyle = this.color;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = (dx / distance) * -1;
        let forceDirectionY = (dy / distance) * -1;
        const maxDistance = 50;
        let force = (maxDistance - distance) / maxDistance;
        if (force > 1) force = 0;
        let directionX = forceDirectionX * force * this.destiny;
        let directionY = forceDirectionY * force * this.destiny;
        // console.log(directionX, directionY);
        if (distance < mouse.radius + this.size) {
          this.x += directionX;
          this.y += directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 30;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 30;
          }
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
        let dx = x - this.x;
        let dy = y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        let alpha = (maxDistance - distance) / maxDistance;

        if (alpha > 1) alpha = 0;
        this.drawLine(x, y, defaultAlpha || alpha);
        return this;
      }
      draw() {
        ctx?.beginPath();
        // ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // ctx?.closePath();
        ctx?.fillRect(this.x, this.y, 4, 4);
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
    const init = () => {
      const ParticleArray: Particle[] = [];
      for (let y = 0, y2 = data?.height; y < y2!; y++) {
        for (let x = 0, x2 = data?.width; x < x2!; x++) {
          if (data!.data[y * 4 * data!.width + x * 4 + 3] > 128) {
            const positionX = x * 2 - ctx!.measureText("Fuck U").width;
            const positionY = y * 2 - 200;
            const color = `rgb(255,255,255)`;
            const particle = new Particle(positionX, positionY, color, 1);
            ParticleArray.push(particle);
          }
        }
      }
      const animation = () => {
        ctx?.clearRect(0, 0, canv!.width, canv!.height);
        // ctx?.beginPath();
        ctx!.fillStyle = "rgba(0,0,0,0.05)";
        ctx?.fillRect(0, 0, canv!.width, canv!.height);
        ParticleArray.map((el) => {
          el.update();
        });
        requestAnimationFrame(animation);
      };
      animation();
    };
    init();
  };
  return <></>;
}
