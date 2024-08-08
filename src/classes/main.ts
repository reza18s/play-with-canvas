export class Main {
  baseX: number = 0;
  baseY: number = 0;
  x: number = 0;
  y: number = 0;
  x2: number = 0;
  y2: number = 0;
  selectX: number = 0;
  selectY: number = 0;
  selectX2: number = 0;
  selectY2: number = 0;
  corners: { top: number; bottom: number; left: number; right: number } = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  color: [r: number, g: number, b: number, a?: number];
  rotate: number = 0;
  selectRotate: number = 0;
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
    const cx = this.x + (this.x2 - this.x) / 2;
    const cy = this.y + (this.y2 - this.y) / 2;
    return { cx, cy };
  }
  getBoundaries() {
    const { cx, cy } = this.calcCenter();
    const length = Math.sqrt(
      (this.x2 - this.x) * (this.x2 - this.x) +
        (this.y2 - this.y) * (this.y2 - this.y),
    );
    const dx = this.x2 - this.x;
    const dy = this.y2 - this.y;
    const angle = Math.atan(dy / dx);
    const rotate = (this.rotate * Math.PI) / 180;
    // const angleDeg = (angle * 180) / Math.PI;
    const x = cx - (length / 2) * Math.cos(angle + rotate);
    const y = cy - (length / 2) * Math.sin(angle + rotate);
    const x2 = cx + (length / 2) * Math.cos(-angle + rotate);
    const y2 = cy + (length / 2) * Math.sin(-angle + rotate);
    const x3 = cx + (length / 2) * Math.cos(angle + rotate);
    const y3 = cy + (length / 2) * Math.sin(angle + rotate);
    const x4 = cx - (length / 2) * Math.cos(-angle + rotate);
    const y4 = cy - (length / 2) * Math.sin(-angle + rotate);
    return {
      top: Math.min(y2, y3, y4, y),
      left: Math.min(x2, x3, x4, x),
      bottom: Math.max(y2, y3, y4, y),
      right: Math.max(x2, x3, x4, x),
    };
  }
  setRotate(x: number, y: number, centerX: number, centerY: number) {
    const dx = centerX - x;
    const dy = centerY - y;
    const angle = Math.atan2(dy, dx);
    const oldRotate = this.rotate;
    this.rotate = (angle * 180) / Math.PI - 90 + this.selectRotate;
    this.updateBoundariesAfterRotate(centerX, centerY, this.rotate - oldRotate);
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
    const cangle = Math.atan2(cdy, cdx);
    const cLength = Math.sqrt(cdx * cdx + cdy * cdy);
    const newCenterX =
      centerX - cLength * Math.cos(cangle + (angle1 * Math.PI) / 180);
    const newCenterY =
      centerY - cLength * Math.sin(cangle + (angle1 * Math.PI) / 180);
    const [dx, dy] = [CX - this.x, CY - this.y];
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const x = newCenterX - length * Math.cos(angle);
    const y = newCenterY - length * Math.sin(angle);
    this.resize({ x, y, x2: x + width, y2: y + height });
  }

  select(ctx: CanvasRenderingContext2D | null | undefined) {
    const { bottom, left, right, top } = this.corners;
    ctx?.save();
    ctx?.beginPath();
    const { cx, cy } = this.calcCenter();
    ctx?.translate(cx, cy);
    ctx?.rotate((this.rotate * Math.PI) / 180);
    ctx?.translate(-cx, -cy);
    ctx!.strokeStyle = `hsl(160,100%,50%)`;
    ctx!.lineWidth = 1;
    ctx?.setLineDash([5, 10]);
    ctx?.strokeRect(left, top, right - left, bottom - top);
    ctx?.stroke();
    ctx?.restore();
    return this;
  }
}
