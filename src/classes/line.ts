import { v4 } from "uuid";
import { Main } from "./main";

export class Line extends Main {
  readonly id = v4();
  readonly type = "line";
  points: { x: number; y: number; colorId: string }[];
  colorId: string = "rgba(0,0,0)";

  constructor(
    x: number,
    y: number,
    color: [r: number, g: number, b: number, a?: number],
  ) {
    super(x, y, color);
    this.points = [{ x, y, colorId: "rgba(0,0,0)" }];
  }

  update(x: number, y: number) {
    this.points[this.points.length - 1] = {
      x,
      y,
      colorId: this.points[this.points.length - 1].colorId,
    };
    return this;
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

  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx!.lineWidth = 1;
    this.drawCanv(
      ctx,
      `rgba(${this.color[0]},${this.color[1]} ,${this.color[2]})`,
    );
    return this;
  }
  hitDraw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx!.lineWidth = 10;
    this.drawCanv(ctx, this.colorId);
    return this;
  }
  private drawCanv(
    ctx: CanvasRenderingContext2D | null | undefined,
    color: string,
  ) {
    const { bottom, left, right, top } = this.corners;
    ctx?.beginPath();
    ctx?.save();
    const { cx, cy } = this.calcCenter();
    ctx?.translate(cx, cy);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-cx, -cy);
    ctx!.strokeStyle = color;
    ctx?.setLineDash([]);
    ctx?.roundRect(left + 5, top + 5, right - left - 10, bottom - top - 10, [
      15,
    ]);
    ctx?.stroke();

    ctx?.restore();
    return this;
  }
}
