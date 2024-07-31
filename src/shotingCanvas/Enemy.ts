export class Enemy {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speed: number = 0;
  color: string;

  constructor(color: string, size: number) {
    switch (Math.floor(Math.random() * 4 + 1)) {
      case 1:
        this.y = 0;
        this.x = Math.random() * window.innerWidth;
        break;
      case 2:
        this.y = Math.random() * window.innerHeight;
        this.x = window.innerWidth;
        break;
      case 3:
        this.y = window.innerHeight;
        this.x = Math.random() * window.innerWidth;
        break;
      case 4:
        this.y = Math.random() * window.innerHeight;
        this.x = 0;
    }
    this.color = color;
    this.size = size;
    this.speed = Math.random() * 3;
  }
  update(
    ctx: CanvasRenderingContext2D | null | undefined,
    playerX: number,
    playerY: number,
  ) {
    ctx!.fillStyle = this.color;
    let dx = playerX - this.x;
    let dy = playerY - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = (dx / distance) * -1;
    let forceDirectionY = (dy / distance) * -1;
    let directionX = forceDirectionX * this.speed;
    let directionY = forceDirectionY * this.speed;
    // console.log(directionX, directionY);
    this.x -= directionX;
    this.y -= directionY;
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
