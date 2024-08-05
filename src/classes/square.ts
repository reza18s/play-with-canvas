import { v4 } from "uuid";
import { Main } from "./main";

export class Square extends Main {
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
    const x = this.x + (this.x2 - this.x) / 2;
    const y = this.y + (this.y2 - this.y) / 2;
    const length = Math.sqrt(
      (this.x2 - this.x) * (this.x2 - this.x) +
        (this.y2 - this.y) * (this.y2 - this.y),
    );
    const x2 = x + (length / 2) * Math.cos((45 * Math.PI) / 180.0);
    const y2 = y + (length / 2) * Math.sin((45 * Math.PI) / 180.0);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
    ctx?.lineTo(x2, y2);
    ctx?.stroke();
    console.log(x2, y2);
    ctx?.beginPath();
    ctx!.strokeStyle = color;
    ctx?.setLineDash([]);
    ctx?.roundRect(
      this.corners.left + 5,
      this.corners.top + 5,
      this.corners.right - this.corners.left - 10,
      this.corners.bottom - this.corners.top - 10,
      [15],
    );
    ctx?.stroke();
    return this;
  }
  select(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(160,100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([5, 10]);
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
