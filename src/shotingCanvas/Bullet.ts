export class Bullet {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speed: number = 0;
  directionX = 0;
  directionY = 0;
  color: string;

  constructor(x: number, y: number, mouseX: number, mouseY: number) {
    this.x = x;
    this.y = y;
    this.color = "blue";
    this.size = 5;
    this.speed = 10;
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = (dx / distance) * -1;
    let forceDirectionY = (dy / distance) * -1;
    this.directionX = forceDirectionX * this.speed;
    this.directionY = forceDirectionY * this.speed;
  }
  update(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx!.fillStyle = this.color;
    this.x -= this.directionX;
    this.y -= this.directionY;
    this.draw(ctx);
    return this;
  }
  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    ctx?.beginPath();
    ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx?.closePath();
    ctx?.fill();
    return this;
  }
}
