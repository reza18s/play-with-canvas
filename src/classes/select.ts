import { v4 } from "uuid";
import { Main } from "./main";

export class Select extends Main {
  readonly id = v4();
  selected: boolean = false;
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
