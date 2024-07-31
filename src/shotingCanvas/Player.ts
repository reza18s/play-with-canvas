export class Player {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speedX: number = 0;
  speedY: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D | null | undefined,
  ) {
    this.x = x;
    this.y = y;
    this.draw(ctx, 0);
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined, hue: number) {
    ctx!.fillStyle = `hsl(${hue},100%,50%)`;
    ctx?.beginPath();
    ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx?.fill();
    return this;
  }
}
