import { useEffect } from "react";
import { Hooks } from "../Hooks";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Bullet } from "./Bullet";
const WW = window.innerWidth;
const WH = window.innerHeight;

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
  const keysPressed = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
  };
  const player = { x: innerWidth / 2, y: innerHeight / 2, radius: 40 };
  const Players: Player[] = [new Player(player.x, player.y)];
  const Enemys: Enemy[] = [];
  const Bullets: Bullet[] = [];
  canv!.width = WW;
  canv!.height = WH;

  Hooks.Resize(canv);
  Hooks.addEventListener("click", (event: MouseEvent) => {
    mouse.x = event.x;
    mouse.y = event.y;
    Bullets.push(new Bullet(player.x, player.y, mouse.x, mouse.y));
  });
  Hooks.addEventListener("keydown", (event: KeyboardEvent) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft"
    ) {
      keysPressed[event.key] = true;
    }
  });
  Hooks.addEventListener("keyup", (event: KeyboardEvent) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft"
    ) {
      keysPressed[event.key] = false;
    }
  });
  const init = () => {
    for (let i = 0; i < 5; i++) {
      Enemys.push(new Enemy("red", Math.random() * 15 + 5));
    }
  };
  init();
  function handelParticles() {
    if (keysPressed.ArrowUp) player.y -= 5;
    if (keysPressed.ArrowDown) player.y += 5;
    if (keysPressed.ArrowRight) player.x += 5;
    if (keysPressed.ArrowLeft) player.x -= 5;
    Players[0].update(player.x, player.y, ctx);
    for (let i = 0; i < Bullets.length; i++) {
      const bullet = Bullets[i];
      bullet.update(ctx);
      if (bullet.x > WW || bullet.x < 0 || bullet.y > WH || bullet.y < 0) {
        Bullets.splice(i, 1);
        i--;
        return;
      }
      // for (let e = 0; e < Enemys.length; e++) {
      //   const enemy = Enemys[e];
      //   let dx = bullet.x - enemy.x;
      //   let dy = bullet.y - enemy.y;
      //   let distance = Math.sqrt(dx * dx + dy * dy);
      //   const radius = bullet.size + enemy.size + 3;
      //   if (radius > distance) {
      //     if (enemy.size < 5) {
      //       Enemys.splice(e, 1);
      //       e--;
      //     } else {
      //       enemy.size -= 2;
      //     }
      //     Bullets.splice(i, 1);
      //     i--;
      //     break;
      //   }
      // }
    }
    let collusion = false;
    // Enemys?.map((cl) => {
    //   cl.update(ctx, player.x, player.y);
    //   let dx = cl.x - player.x;
    //   let dy = cl.y - player.y;
    //   let distance = Math.sqrt(dx * dx + dy * dy);
    //   const radius = cl.size + player.radius + 5;
    //   if (radius > distance) {
    //     collusion = true;
    //   }
    // });
    // if (collusion) {
    //   return true;
    // }
  }

  const animation = () => {
    ctx!.fillStyle = "rgba(0,0,0,0.05)";
    ctx?.fillRect(0, 0, canv!.width, canv!.height);
    const res = handelParticles();
    // if (res) return;
    requestAnimationFrame(animation);
  };
  useEffect(() => {
    animation();
  }, []);
  return <></>;
}
