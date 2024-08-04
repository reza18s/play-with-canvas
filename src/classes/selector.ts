import { v4 } from "uuid";
import { Main } from "./main";

export class Selector extends Main {
  readonly id = v4();
  readonly type = "select";
  selectX: number = 0;
  selectY: number = 0;
  selectX2: number = 0;
  selectY2: number = 0;
  resize_height: number = 0;
  resize_width: number = 0;
  show: boolean = true;
  lastWidth: number = 0;
  lastHeight: number = 0;
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
    if (x) this.x = x;
    if (y) this.y = y;
    if (x2) this.x2 = x2;
    if (y2) this.y2 = y2;
    this.calcTBLR();
  }
  draw(
    ctx: CanvasRenderingContext2D | null | undefined,
    hitctx: CanvasRenderingContext2D | null | undefined,
    hue: number,
  ) {
    if (!this.show) return this;
    hitctx?.beginPath();
    hitctx!.strokeStyle = `hsl(${hue + 100},100%,50%)`;
    hitctx!.lineWidth = 1;
    hitctx?.setLineDash([2]);
    hitctx?.strokeRect(
      this.x + 100,
      this.y,
      this.x2 - this.x,
      this.y2 - this.y,
    );
    hitctx?.stroke();
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue - 100},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.stroke();
    return this;
  }
  select(
    ctx: CanvasRenderingContext2D | null | undefined,
    hitctx: CanvasRenderingContext2D | null | undefined,
    hue: number,
  ) {
    hitctx?.beginPath();
    hitctx!.strokeStyle = `hsl(${hue + 100},100%,50%)`;
    hitctx!.lineWidth = 1;
    hitctx?.setLineDash([2]);
    hitctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    hitctx?.stroke();
    if (!this.show) return this;
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.stroke();
    return this;
  }
}
