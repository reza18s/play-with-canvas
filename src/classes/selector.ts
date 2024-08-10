import { v4 } from "uuid";
import { Main } from "./main";

export class Selector extends Main {
  readonly id = v4();
  readonly type = "select";
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

  update(x: number, y: number) {
    this.x2 = x;
    this.y2 = y;
    this.calcTBLR();
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.save();
    const { cx, cy } = this.calcCenter();
    ctx?.translate(cx, cy);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-cx, -cy);
    this.selectTool(ctx, this.colorId, this.x - 10, this.y - 10);
    this.selectTool(
      ctx,
      this.colorId,
      this.x + this.x2 - this.x - 10,
      this.y - 10,
    );
    this.selectTool(
      ctx,
      this.colorId,
      this.x - 10,
      this.y + this.y2 - this.y - 10,
    );
    this.selectTool(
      ctx,
      this.colorId,
      this.x + this.x2 - this.x - 10,
      this.y + this.y2 - this.y - 10,
    );

    this.selectTool(
      ctx,
      this.colorId,
      Math.min(this.x, this.x2) +
        (Math.max(this.x, this.x2) - Math.min(this.x, this.x2)) / 2 -
        10,
      Math.min(this.y, this.y2) - 50,
    );
    this.drawCanv(ctx, this.colorId);
    ctx?.restore();
    return this;
  }
  hitDraw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.save();
    const { cx, cy } = this.calcCenter();
    ctx?.translate(cx, cy);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-cx, -cy);
    ctx!.fillStyle = this.colorId;
    ctx!.lineWidth = 1;
    ctx?.fillRect(
      this.x - 5,
      this.y - 5,
      this.x2 - this.x + 10,
      this.y2 - this.y + 10,
    );
    ctx?.fill();
    this.selectTool(ctx, "rgb(150,150,150)", this.x - 10, this.y - 10);
    this.selectTool(
      ctx,
      "rgb(150,150,151)",
      this.x + this.x2 - this.x - 10,
      this.y - 10,
    );
    this.selectTool(
      ctx,
      "rgb(150,150,152)",
      this.x - 10,
      this.y + this.y2 - this.y - 10,
    );
    this.selectTool(
      ctx,
      "rgb(150,150,153)",
      this.x + this.x2 - this.x - 10,
      this.y + this.y2 - this.y - 10,
    );
    this.selectTool(
      ctx,
      "rgb(150,150,154)",
      Math.min(this.x, this.x2) +
        (Math.max(this.x, this.x2) - Math.min(this.x, this.x2)) / 2 -
        10,
      Math.min(this.y, this.y2) - 50,
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
    ctx!.strokeStyle = color;
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
  ) {
    ///////////////////////////////
    ctx?.beginPath();
    ctx!.fillStyle = color;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.roundRect(x, y, 20, 20, [5]);
    ctx?.fill();
    ///////////////////////////////
  }
}
