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
  rotate: number = 0;
  centerX: number;
  centerY: number;
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
    this.centerX = this.x + (this.x2 - this.x) / 2;
    this.centerY = this.y + (this.y2 - this.y) / 2;
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
  setRotate(x: number, y: number, centerX: number, centerY: number) {
    const dx = centerX - x;
    const dy = centerY - y;
    const angle = Math.atan2(dy, dx);
    this.rotate = (angle * 180) / Math.PI - 90;

    this.updateBoundariesAfterRotate(this.centerX, this.centerY, this.rotate);
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
  calcCenter() {
    this.centerX = this.x + (this.x2 - this.x) / 2;
    this.centerY = this.y + (this.y2 - this.y) / 2;
  }
  getBoundaries() {
    const centerX = this.x + (this.x2 - this.x) / 2;
    const centerY = this.y + (this.y2 - this.y) / 2;
    const length = Math.sqrt(
      (this.x2 - this.x) * (this.x2 - this.x) +
        (this.y2 - this.y) * (this.y2 - this.y),
    );
    const dx = this.x2 - this.x;
    const dy = this.y2 - this.y;
    const angle = Math.atan(dy / dx);
    // const angleDeg = (angle * 180) / Math.PI;
    const x3 =
      centerX + (length / 2) * Math.cos(angle + (this.rotate * Math.PI) / 180);
    const y3 =
      centerY + (length / 2) * Math.sin(angle + (this.rotate * Math.PI) / 180);
    const x2 =
      centerX + (length / 2) * Math.cos(-angle + (this.rotate * Math.PI) / 180);
    const y2 =
      centerY + (length / 2) * Math.sin(-angle + (this.rotate * Math.PI) / 180);
    const x =
      centerX - (length / 2) * Math.cos(angle + (this.rotate * Math.PI) / 180);
    const y =
      centerY - (length / 2) * Math.sin(angle + (this.rotate * Math.PI) / 180);
    const x4 =
      centerX - (length / 2) * Math.cos(-angle + (this.rotate * Math.PI) / 180);
    const y4 =
      centerY - (length / 2) * Math.sin(-angle + (this.rotate * Math.PI) / 180);
    return {
      top: Math.min(y2, y3, y4, y),
      left: Math.min(x2, x3, x4, x),
      bottom: Math.max(y2, y3, y4, y),
      right: Math.max(x2, x3, x4, x),
    };
  }
  updateBoundariesAfterRotate(
    centerX: number,
    centerY: number,
    angle1: number,
  ) {
    const [width, height] = [this.x2 - this.x, this.y2 - this.y];
    const CX = this.x + width / 2;
    const CY = this.y + height / 2;
    const cdx = centerX - CX;
    const cdy = centerY - CY;
    const cLength = Math.sqrt(cdx * cdx + cdy * cdy);
    let newCenterX: number;
    let newCenterY: number;
    if (CX < centerX) {
      newCenterX = centerX - cLength * Math.cos((angle1 * Math.PI) / 180);
    } else {
      newCenterX = centerX + cLength * Math.cos((angle1 * Math.PI) / 180);
    }
    if (CY < centerX) {
      newCenterY = centerY - cLength * Math.sin((angle1 * Math.PI) / 180);
    } else {
      newCenterY = centerY + cLength * Math.sin((angle1 * Math.PI) / 180);
    }
    const [dx, dy] = [CX - this.x, CY - this.y];
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const x = newCenterX - length * Math.cos(angle);
    const y = newCenterY - length * Math.sin(angle);
    console.log({ newCenterX, newCenterY, centerX, centerY, x, y });
    this.x = x;
    this.y = y;
    this.x2 = x + width;
    this.y2 = y + height;
  }
}
