import { v4 } from "uuid";
import { Main } from "./main";

export class Ellipse extends Main {
  readonly id = v4();
  readonly type = "square";
  colorId: string = "rgba(0,0,0)";
  constructor(
    x: number,
    y: number,
    color: [r: number, g: number, b: number, a?: number],
  ) {
    super(x, y, color);
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
    ctx?.save();
    const Radius = (this.corners.right - this.corners.left) / 2;
    const Radius2 = (this.corners.bottom - this.corners.top) / 2;
    ctx?.beginPath();
    ctx!.strokeStyle = color;
    ctx?.setLineDash([]);
    const { cx, cy } = this.calcCenter();
    ctx?.translate(cx, cy);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-cx, -cy);
    ctx?.ellipse(
      this.corners.left + (this.corners.right - this.corners.left) / 2,
      this.corners.top + (this.corners.bottom - this.corners.top) / 2,
      Radius - 5 < 0 ? 0 : Radius - 5,
      Radius2 - 5 < 0 ? 0 : Radius2 - 5,
      Math.PI,
      0,
      Math.PI * 2,
    );
    ctx?.stroke();
    ctx?.restore();
    return this;
  }
}
