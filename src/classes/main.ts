export class Main {
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
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.x2 = x;
    this.y2 = y;
  }
  update(x: number, y: number) {
    this.x2 = x;
    this.y2 = y;
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
}
