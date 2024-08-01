import { Hooks } from "../Hooks";

class Particle {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speedX: number = 0;
  speedY: number = 0;
  collusion: boolean = false;

  constructor() {
    this.x = Math.random() * (window.innerWidth + 500);
    this.y = -30;
    this.size = Math.random() * 10 + 1;
    this.speedX = -2;

    this.speedY = Math.random() * 3 + 2;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.speedX < -1) {
      this.speedX = this.speedX + 0.005;
    }
    if (this.speedY > 2) {
      this.speedY = this.speedY - 0.005;
    } else {
      this.speedY = this.speedY + 0.005;
    }
    if (
      this.x > window.innerWidth / 2 - 200 &&
      this.x < window.innerWidth / 2 + 200
    )
      if (
        this.y > window.innerHeight / 2 - 65 &&
        this.y < window.innerHeight / 2 - 60
      ) {
        this.speedY = Math.random() * -1 - 0.5;
      }
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx!.fillStyle = `hsl(200,0%,100%)`;
    ctx?.beginPath();
    ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx?.fill();
    return this;
  }
  reverse() {
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
  const text = document.getElementById("text");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let hue = 0;
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  const particleArray: Particle[] = [];

  Hooks.Resize(canv);
  console.log(text?.getBoundingClientRect());
  function handelParticles() {
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update().draw(ctx);
      if (
        particleArray[i].y > window.innerHeight + 50 ||
        particleArray[i].x < -50 ||
        particleArray[i].x > window.innerWidth + 100
      ) {
        particleArray.splice(i, 1);
        i--;
      }
    }
  }

  const animation = () => {
    ctx?.beginPath();
    ctx!.fillStyle = "rgba(0,0,0,0.05)";
    ctx?.fillRect(0, 0, canv!.width, canv!.height);
    for (let i = 0; i < 1; i++) {
      particleArray.push(new Particle());
    }
    handelParticles();
    hue++;
    requestAnimationFrame(animation);
  };
  animation();
  return <></>;
}
