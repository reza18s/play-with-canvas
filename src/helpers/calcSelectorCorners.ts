import { ISelectItems } from "../types/types";

export const calcSelectorCorners = (selectedItems: ISelectItems) => {
  let showSelector = true;
  let selector_top = selectedItems[0].corners.top,
    selector_bottom = selectedItems[0].corners.bottom,
    selector_left = selectedItems[0].corners.left,
    selector_right = selectedItems[0].corners.right;

  selectedItems.map((Item) => {
    // it will check the maximum corners belong to one item and if that true it wont show the selector
    const { top, bottom, left, right } = Item.getBoundaries();
    if (
      top < selector_top ||
      bottom > selector_bottom ||
      left < selector_left ||
      right > selector_right
    ) {
      showSelector = true;
    }
    selector_top = selector_top > top ? top : selector_top;
    selector_bottom = selector_bottom < bottom ? bottom : selector_bottom;
    selector_left = selector_left > left ? left : selector_left;
    selector_right = selector_right < right ? right : selector_right;
    if (
      top == selector_top &&
      bottom == selector_bottom &&
      left == selector_left &&
      right == selector_right
    ) {
      if (Item.rotate === 0) {
        showSelector = false;
      }
    }
  });
  return {
    selector_top,
    selector_bottom,
    selector_left,
    selector_right,
    showSelector,
  };
};
