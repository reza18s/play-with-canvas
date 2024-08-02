import { v4 } from "uuid";

export class Select {
  readonly id = v4();
  x: number = 0;
  y: number = 0;
  height: number = 10;
  width: number = 10;
  selected: boolean = false;
  corners: { top: number; bottom: number; left: number; right: number } = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  update(x: number, y: number) {
    this.width = x - this.x;
    this.height = y - this.y;
    this.calcTBLR();
    return this;
  }
  private calcTBLR() {
    if (this.x < this.x + this.width) {
      this.corners.left = this.x;
      this.corners.right = this.x + this.width;
    } else {
      this.corners.left = this.x + this.width;
      this.corners.right = this.x;
    }
    if (this.y < this.y + this.height) {
      this.corners.top = this.y;
      this.corners.bottom = this.y + this.height;
    } else {
      this.corners.top = this.y + this.height;
      this.corners.bottom = this.y;
    }
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx?.beginPath();
    ctx!.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([]);
    ctx?.strokeRect(this.x, this.y, this.width, this.height);
    ctx?.stroke();
    ctx?.beginPath();
    ctx!.fillStyle = `hsla(${hue},100%,50%,0.1)`;
    ctx?.fillRect(this.x, this.y, this.width, this.height);
    ctx?.fill();

    return this;
  }
}
