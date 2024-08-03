import { v4 } from "uuid";
import { Main } from "./main";

export class Square extends Main {
  readonly id = v4();
  readonly type = "square";
  selectX: number = 0;
  selectY: number = 0;
  resize_height: number = 0;
  resize_width: number = 0;
  constructor(x: number, y: number) {
    super(x, y);
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
    if (x) this.x = x;
    if (y) this.y = y;
    if (x2) this.x2 = x2;
    if (y2) this.y2 = y2;
    this.calcTBLR();
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
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number = 2) {
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
    return this;
  }
  select(ctx: CanvasRenderingContext2D | null | undefined, hue: number = 0) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([5, 10]);
    ctx?.strokeRect(
      this.corners.left - 5,
      this.corners.top - 5,
      this.corners.right - this.corners.left + 10,
      this.corners.bottom - this.corners.top + 10,
    );
    ctx?.stroke();
    return this;
  }
}
