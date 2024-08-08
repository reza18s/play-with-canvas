export const math = {
  rotate: (
    x: number,
    y: number,
    cx: number,
    cy: number,
    angle: number,
  ): [number, number] => {
    return [
      (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
      (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
    ];
  },
};
