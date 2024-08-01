import { useEffect, useRef } from "react";
import { Hooks } from "../Hooks";
import { useLocalStore } from "../store/useLocalStore";

class Square {
  type = "square";
  x: number = 0;
  y: number = 0;
  height: number = 10;
  width: number = 10;
  selectX: number = 0;
  selectY: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  update(x: number, y: number) {
    this.width = x - this.x;
    this.height = y - this.y;
  }
  move(mouseMoveX: number, mouseMoveY: number) {
    this.x = mouseMoveX - this.selectX;
    this.y = mouseMoveY - this.selectY;
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;

    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.strokeRect(this.x, this.y, this.width, this.height);
    ctx?.stroke();
    return this;
  }
  select(
    ctx: CanvasRenderingContext2D | null | undefined,
    lineDashOffset: 2 | 6 | 0 = 0,
  ) {
    ctx?.beginPath();
    ctx!.lineWidth = 0.7;
    ctx?.setLineDash([10, 5]);
    ctx!.strokeStyle = `hsl(195, 100%, 50%)`;
    ctx?.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    ctx?.stroke();
    return this;
  }
}
export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  ctx?.setLineDash([6]);
  const { getCanvasType, setCanvasType } = useLocalStore();
  const requestRef = useRef<number>(0);
  let isDrawing = false;
  const mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    radius: 1000,
  };
  const squares: Square[] = [];
  let select: Square[] = [];
  let move: boolean = false;
  Hooks.Resize(canv);
  Hooks.useAddEventListener("mousemove", (event: MouseEvent) => {
    mouse.x = event.x;
    mouse.y = event.y;
    if (getCanvasType() == "square" && squares && isDrawing) {
      squares[squares.length - 1].update(mouse.x, mouse.y);
    }
    if (getCanvasType() == "move" && select.length !== 0 && move) {
      select.map((el) => {
        el.move(event.x, event.y);
      });
    }
  });
  Hooks.useAddEventListener("mousedown", (event: MouseEvent) => {
    if (getCanvasType() === "square") {
      isDrawing = true;
      squares.push(new Square(event.x, event.y));
    }
    if (getCanvasType() === "move") {
      for (let i = 0; i < squares.length; i++) {
        const square = squares[squares.length - i - 1];
        if (
          square.x - 5 < event.x &&
          square.x + square.width + 5 > event.x &&
          square.y - 5 < event.y &&
          square.y + square.height + 5 > event.y
        ) {
          if (
            !(
              select.length === 0 &&
              square.x + 5 < event.x &&
              square.x + square.width - 5 > event.x &&
              square.y + 5 < event.y &&
              square.y + square.height - 5 > event.y
            )
          ) {
            square.selectX = event.x - square.x;
            square.selectY = event.y - square.y;
            move = true;
            select = [square];
            break;
          }
        } else {
          console.log("fuck");
          select = [];
          move = false;
        }
      }
    }
  });
  Hooks.useAddEventListener("mouseup", () => {
    isDrawing = false;
    if (getCanvasType() !== "move") {
      setCanvasType("move");
    }
    move = false;
  });
  const Animation = () => {
    ctx?.beginPath();
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    if (squares) {
      squares.map((square) => {
        square.draw(ctx, 0);
      });
    }
    if (squares) {
      select.map((square) => {
        square.select(ctx, 6);
      });
    }
    requestRef.current = requestAnimationFrame(() => Animation());
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(Animation);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <></>;
}
