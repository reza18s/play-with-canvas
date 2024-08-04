import { Selector } from "../classes/selector";
import { ISelectItem } from "../types/types";

export const generateColorId = (
  colorIds: { [key: string]: ISelectItem | Selector },
  item: ISelectItem | Selector,
) => {
  if (item.type === "select") {
    colorIds[item.colorId] = item;
    return item.colorId;
  } else {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const colorKey = getRandomColor();
      if (!colorIds[colorKey]) {
        colorIds[colorKey] = item;
        return colorKey;
      }
    }
  }
};
function getRandomColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}
