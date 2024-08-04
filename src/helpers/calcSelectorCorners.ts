import { ISelectItems } from "../types/types";

export const calcSelectorCorners = (selectedItems: ISelectItems) => {
  let showSelector = true;
  let selector_top = selectedItems[0].corners.top,
    selector_bottom = selectedItems[0].corners.bottom,
    selector_left = selectedItems[0].corners.left,
    selector_right = selectedItems[0].corners.right;

  selectedItems.map((Item, index) => {
    // it will check the maximum corners belong to one item and if that true it wont show the selector
    if (index == 0) return;
    if (
      Item.corners.top < selector_top ||
      Item.corners.bottom > selector_bottom ||
      Item.corners.left < selector_left ||
      Item.corners.right > selector_right
    ) {
      showSelector = true;
    }
    selector_top =
      selector_top > Item.corners.top ? Item.corners.top : selector_top;
    selector_bottom =
      selector_bottom < Item.corners.bottom
        ? Item.corners.bottom
        : selector_bottom;
    selector_left =
      selector_left > Item.corners.left ? Item.corners.left : selector_left;
    selector_right =
      selector_right < Item.corners.right ? Item.corners.right : selector_right;
    if (
      Item.corners.top == selector_top &&
      Item.corners.bottom == selector_bottom &&
      Item.corners.left == selector_left &&
      Item.corners.right == selector_right
    ) {
      console.log(false);
      showSelector = false;
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
