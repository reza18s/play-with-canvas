import { v4 } from "uuid";
import { Main } from "./main";

export class Selector extends Main {
  readonly id = v4();
  readonly type = "select";
  selectX: number = 0;
  selectY: number = 0;
  selectX2: number = 0;
  selectY2: number = 0;
  show: boolean = true;
  lastWidth: number = 0;
  lastHeight: number = 0;
  colorId: string = "rgb(0,160,255)";
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
    this.drawCanv(
      ctx,
      `rgba(${this.color[0]},${this.color[1]} ,${this.color[2]})`,
    );
    return this;
  }
  hitDraw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx!.fillStyle = this.colorId;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.fillRect(
      this.x - 5,
      this.y - 5,
      this.x2 - this.x + 10,
      this.y2 - this.y + 10,
    );
    ctx?.fill();
    return this;
  }
  private drawCanv(
    ctx: CanvasRenderingContext2D | null | undefined,
    color: string,
  ) {
    if (!this.show) return this;
    ctx?.beginPath();
    ctx!.strokeStyle = color;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.stroke();
    return this;
  }
}
