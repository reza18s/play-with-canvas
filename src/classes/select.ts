import { v4 } from "uuid";
import { Main } from "./main";

export class Select extends Main {
  readonly id = v4();
  selected: boolean = false;
  constructor(x: number, y: number) {
    super(x, y, [0, 160, 255]);
  }

  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.beginPath();
    ctx!.strokeStyle = `rgba(${this.color[0]},${this.color[1]} ,${this.color[2]})`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.stroke();
    ctx?.beginPath();
    ctx!.fillStyle = `rgba(${this.color[0]},${this.color[1]} ,${this.color[2]},0.2)`;
    ctx?.fillRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.fill();
    return this;
  }
}
