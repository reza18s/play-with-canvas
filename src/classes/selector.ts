import { v4 } from "uuid";
import { Main } from "./main";

export class Selector extends Main {
  readonly id = v4();
  readonly type = "select";
  selectX: number = 0;
  selectY: number = 0;
  resize_height: number = 0;
  resize_width: number = 0;
  constructor(x: number, y: number) {
    super(x, y);
  }

  move(mouseMoveX: number, mouseMoveY: number) {
    const width = this.x2 - this.x;
    const height = this.y2 - this.y;
    this.x = mouseMoveX - this.selectX;
    this.y = mouseMoveY - this.selectY;
    this.x2 = this.x + width;
    this.y2 = this.y + height;

    this.calcTBLR();
    return this;
  }

  resize({
    x,
    y,
    x2,
    y2,
  }: {
    x?: number;
    y?: number;
    x2?: number;
    y2?: number;
  }) {
    if (x) this.x = x - this.selectX;
    if (y) this.y = y - this.selectY;
    if (x2) this.x2 = x2;
    if (y2) this.y2 = y2;
    this.calcTBLR();
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.strokeRect(
      this.corners.left,
      this.corners.top,
      this.corners.right - this.corners.left,
      this.corners.bottom - this.corners.top,
    );
    ctx?.stroke();
    return this;
  }
  select(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.strokeRect(
      this.corners.left,
      this.corners.top,
      this.corners.right - this.corners.left,
      this.corners.bottom - this.corners.top,
    );
    ctx?.stroke();
    return this;
  }
}
