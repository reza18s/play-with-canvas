import { useEffect } from "react";
import { base64url } from "./context";
import { Hooks } from "./Hooks";

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
    radius: 1000,
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
    ctx?.drawImage(userImage, 0, 0);
    drawImage();
  };
  const drawImage = () => {
    let imageWidth = userImage.width;
    let imageHeight = userImage.height;
    const data = ctx?.getImageData(0, 0, imageWidth, imageHeight);
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    console.log(data?.data);
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      baseX: number = 0;
      baseY: number = 0;
      destiny: number = 0;
      color: string;

      constructor(x: number, y: number, color: string, size: number) {
        this.x = x + canv!.width / 2 - userImage.width * 2;
        this.y = y + canv!.height / 2 - userImage.height * 2;
        this.color = color;
        this.size = size;
        this.baseX = x + canv!.width / 2 - userImage.width * 2;
        this.baseY = y + canv!.height / 2 - userImage.height * 2;
        this.destiny = Math.random() * 10 + 2;
      }
      update() {
        ctx!.fillStyle = this.color;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = (dx / distance) * -1;
        let forceDirectionY = (dy / distance) * -1;
        const maxDistance = 1000;
        let force = (maxDistance - distance) / maxDistance;
        if (force > 0.9) force = 0;
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
      draw() {
        ctx?.beginPath();
        ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx?.closePath();
        ctx?.fill();
        return this;
      }
    }
    const init = () => {
      const ParticleArray: Particle[] = [];
      for (let y = 0, y2 = data?.height; y < y2!; y++) {
        for (let x = 0, x2 = data?.width; x < x2!; x++) {
          if (data!.data[y * 4 * data!.width + x * 4 + 3] > 128) {
            const positionX = x;
            const positionY = y;
            const color = `rgb(${data!.data[y * 4 * data!.width + x * 4]},${data!.data[y * 4 * data!.width + x * 4 + 1]},${data!.data[y * 4 * data!.width + x * 4 + 2]})`;
            const particle = new Particle(
              positionX * 4,
              positionY * 4,
              color,
              4,
            );
            ParticleArray.push(particle);
          }
        }
      }
      const animation = () => {
        ctx?.clearRect(0, 0, canv!.width, canv!.height);
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
