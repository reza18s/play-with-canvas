import { Selector } from "../classes/selector";
import { ISelectItem } from "../types/types";

export const generateColorId = (
  item: ISelectItem | Selector,
  colorsId: { [key: string]: ISelectItem | Selector },
  setColorsId: (key: string, val: ISelectItem | Selector) => void,
) => {
  if (item.type === "select") {
    colorsId[item.colorId] = item;
    return item.colorId;
  } else {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const colorKey = getRandomColor();
      if (!colorsId[colorKey]) {
        setColorsId(colorKey, item);
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
