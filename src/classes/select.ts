import { v4 } from "uuid";
import { Main } from "./main";

export class Select extends Main {
  readonly id = v4();
  x: number = 0;
  y: number = 0;
  x2: number = 0;
  y2: number = 0;
  selected: boolean = false;
  corners: { top: number; bottom: number; left: number; right: number } = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.strokeRect(
      this.corners.left,
      this.corners.top,
      this.corners.right - this.corners.left,
      this.corners.bottom - this.corners.top,
    );
    ctx?.stroke();
    ctx?.beginPath();
    ctx!.fillStyle = `hsla(${hue},100%,50%,0.1)`;
    ctx?.fillRect(
      this.corners.left,
      this.corners.top,
      this.corners.right - this.corners.left,
      this.corners.bottom - this.corners.top,
    );
    ctx?.fill();

    return this;
  }
}
