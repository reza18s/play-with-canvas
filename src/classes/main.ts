export class Main {
  baseX: number = 0;
  baseY: number = 0;
  x: number = 0;
  y: number = 0;
  x2: number = 0;
  y2: number = 0;
  corners: { top: number; bottom: number; left: number; right: number } = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  color: [r: number, g: number, b: number, a?: number];
  constructor(
    x: number,
    y: number,
    color: [r: number, g: number, b: number, a?: number],
  ) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.x2 = x;
    this.y2 = y;
    this.color = color;
  }
  update(x: number, y: number) {
    if (x > this.baseX) {
      this.x2 = x;
      this.x = this.baseX;
    } else {
      this.x = x;
      this.x2 = this.baseX;
    }
    if (y > this.baseY) {
      this.y2 = y;
      this.y = this.baseY;
    } else {
      this.y = y;
      this.y2 = this.baseY;
    }

    this.calcTBLR();
    return this;
  }
  calcTBLR() {
    if (this.x < this.x2) {
      this.corners.left = this.x;
      this.corners.right = this.x2;
    } else {
      this.corners.left = this.x2;
      this.corners.right = this.x;
    }
    if (this.y < this.y2) {
      this.corners.top = this.y;
      this.corners.bottom = this.y2;
    } else {
      this.corners.top = this.y2;
      this.corners.bottom = this.y;
    }
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
}
