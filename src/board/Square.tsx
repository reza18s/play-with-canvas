import { useEffect, useRef } from "react";
import { Hooks } from "../Hooks";
import { ICanvasType } from "../types/types";

class Square {
  type = "square";
  x: number = 0;
  y: number = 0;
  height: number = 10;
  width: number = 10;
  private startX: number;
  private startY: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
  }
  update(x: number, y: number) {
    this.width = x - this.startX;
    this.height = y - this.startY;
  }
  move(mouseMoveX: number, mouseMoveY: number) {
    this.x += mouseMoveX;
    this.y += mouseMoveY;
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx?.beginPath();
    ctx?.strokeRect(this.x, this.y, this.width, this.height);
    ctx?.stroke();
    return this;
  }
}
export default function Canvas({
  canv,
  canvasType,
  setCanvasType,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
  canvasType: ICanvasType;
  setCanvasType: React.Dispatch<React.SetStateAction<ICanvasType>>;
}) {
  const requestRef = useRef<number>(0);
  let isDrawing = false;
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  const mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    radius: 1000,
  };
  const squares: Square[] = [];
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  Hooks.Resize(canv);
  Hooks.useAddEventListener("mousemove", (event: MouseEvent) => {
    mouse.x = event.x;
    mouse.y = event.y;
    if (canvasType == "square" && squares && isDrawing) {
      squares[squares.length - 1].update(mouse.x, mouse.y);
    }
  });
  Hooks.useAddEventListener("mousedown", (event: MouseEvent) => {
    isDrawing = true;
    if (canvasType === "square") squares.push(new Square(event.x, event.y));
  });
  Hooks.useAddEventListener("mouseup", (_event: MouseEvent) => {
    isDrawing = false;
  });
  const Animation = () => {
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    if (squares) {
      squares.map((square) => {
        square.draw(ctx, 0);
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
