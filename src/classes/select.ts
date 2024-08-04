import { v4 } from "uuid";
import { Main } from "./main";

export class Select extends Main {
  readonly id = v4();
  selected: boolean = false;
  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(
    ctx: CanvasRenderingContext2D | null | undefined,
    hitctx: CanvasRenderingContext2D | null | undefined,
    hue: number,
  ) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.stroke();
    ctx?.beginPath();
    ctx!.fillStyle = `hsla(${hue},100%,50%,0.1)`;
    ctx?.fillRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.fill();

    return this;
  }
}
