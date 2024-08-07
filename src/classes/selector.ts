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
  colorIds: { [key: string]: string } = {
    "rgb(150,150,150)": "resize-top-left",
    "rgb(150,150,152)": "resize-bottom-left",
    "rgb(150,150,151)": "resize-top-right",
    "rgb(150,150,153)": "resize-bottom-right",
    "rgb(150,150,154)": "rotate",
  };
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
    this.calcCenter();
    this.calcTBLR();
    return this;
  }

  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.save();
    this.calcCenter();
    ctx?.translate(this.centerX, this.centerY);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-this.centerX, -this.centerY);
    this.selectTool(ctx, "rgb(150,150,150)", this.x - 10, this.y - 10, 20, 20, [
      5,
    ]);
    this.selectTool(
      ctx,
      "rgb(150,150,180)",
      this.x + this.x2 - this.x - 10,
      this.y - 10,
      20,
      20,
      [5],
    );
    this.selectTool(
      ctx,
      "rgb(150,150,200)",
      this.x - 10,
      this.y + this.y2 - this.y - 10,
      20,
      20,
      [5],
    );
    this.selectTool(
      ctx,
      "rgb(150,70,153)",
      this.x + this.x2 - this.x - 10,
      this.y + this.y2 - this.y - 10,
      20,
      20,
      [5],
    );
    this.selectTool(
      ctx,
      "rgb(150,150,154)",
      this.x + (this.x2 - this.x) / 2 - 10,
      this.y - 50,
      20,
      20,
      [5],
    );
    this.drawCanv(ctx, this.colorId);
    ctx?.restore();
    return this;
  }
  hitDraw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.save();
    this.calcCenter();
    ctx?.translate(this.centerX, this.centerY);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-this.centerX, -this.centerY);
    ctx!.fillStyle = this.colorId;
    ctx!.lineWidth = 1;
    ctx?.fillRect(
      this.x - 5,
      this.y - 5,
      this.x2 - this.x + 10,
      this.y2 - this.y + 10,
    );
    ctx?.fill();
    this.selectTool(ctx, "rgb(150,150,150)", this.x - 10, this.y - 10, 20, 20, [
      5,
    ]);
    this.selectTool(
      ctx,
      "rgb(150,150,151)",
      this.x + this.x2 - this.x - 10,
      this.y - 10,
      20,
      20,
      [5],
    );
    this.selectTool(
      ctx,
      "rgb(150,150,152)",
      this.x - 10,
      this.y + this.y2 - this.y - 10,
      20,
      20,
      [5],
    );
    this.selectTool(
      ctx,
      "rgb(150,150,153)",
      this.x + this.x2 - this.x - 10,
      this.y + this.y2 - this.y - 10,
      20,
      20,
      [5],
    );
    this.selectTool(
      ctx,
      "rgb(150,150,154)",
      this.x + (this.x2 - this.x) / 2 - 10,
      this.y - 50,
      20,
      20,
      [5],
    );
    ctx?.restore();
    return this;
  }
  private drawCanv(
    ctx: CanvasRenderingContext2D | null | undefined,
    color: string,
  ) {
    if (!this.show) return this;
    ctx?.beginPath();
    ctx!.strokeStyle = "white";
    ctx!.lineWidth = 1;
    ctx?.setLineDash([2]);
    ctx?.strokeRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
    ctx?.stroke();
    return this;
  }
  private selectTool(
    ctx: CanvasRenderingContext2D | null | undefined,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
    rounded: [number],
  ) {
    ///////////////////////////////
    ctx?.beginPath();
    ctx!.fillStyle = color;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.roundRect(x, y, width, height, rounded);
    ctx?.fill();
    ///////////////////////////////
  }
}
