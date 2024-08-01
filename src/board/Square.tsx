import { useEffect, useRef } from "react";
import { Hooks } from "../Hooks";
import { ICanvasType } from "../types/types";
import { useLocalStore } from "../store/useLocalStore";

class Square {
  type = "square";
  x: number = 0;
  y: number = 0;
  height: number = 10;
  width: number = 10;
  selectX: number = 0;
  selectY: number = 0;
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
    this.x = mouseMoveX - this.selectX;
    this.y = mouseMoveY - this.selectY;
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
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  const { getCanvasType, setCanvasType } = useLocalStore();
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
  let selectSquare: Square | null;
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  Hooks.Resize(canv);
  Hooks.useAddEventListener("mousemove", (event: MouseEvent) => {
    mouse.x = event.x;
    mouse.y = event.y;
    if (getCanvasType() == "square" && squares && isDrawing) {
      squares[squares.length - 1].update(mouse.x, mouse.y);
    }
    if (selectSquare) {
      selectSquare.move(event.x, event.y);
    }
  });
  Hooks.useAddEventListener("mousedown", (event: MouseEvent) => {
    isDrawing = true;
    if (getCanvasType() === "square")
      squares.push(new Square(event.x, event.y));
    if (getCanvasType() === "move") {
      squares.map((square) => {
        if (
          square.x < event.x &&
          square.x + square.width > event.x &&
          square.y < event.y &&
          square.y + square.height > event.y
        ) {
          square.selectX = event.x - square.x;
          square.selectY = event.y - square.y;
          selectSquare = square;
        }
      });
    }
  });
  Hooks.useAddEventListener("mouseup", (_event: MouseEvent) => {
    isDrawing = false;
    if (getCanvasType() !== "move") {
      setCanvasType("move");
    }
    selectSquare = null;
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
