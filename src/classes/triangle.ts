import { v4 } from "uuid";
import { Main } from "./main";

export class Triangle extends Main {
  readonly id = v4();
  readonly type = "square";
  selectX: number = 0;
  selectY: number = 0;
  selectX2: number = 0;
  selectY2: number = 0;
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
    const { bottom, left, right, top } = this.corners;
    ctx?.beginPath();
    ctx?.save();
    const { cx, cy } = this.calcCenter();
    ctx?.translate(cx, cy);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-cx, -cy);
    ctx!.strokeStyle = color;
    ctx?.setLineDash([]);
    ctx?.moveTo(left + right - left, top);
    ctx?.lineTo(bottom, left);
    ctx?.lineTo(bottom, right);
    ctx?.stroke();

    ctx?.restore();
    return this;
  }
}
