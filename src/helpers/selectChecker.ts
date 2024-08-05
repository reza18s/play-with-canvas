/* eslint-disable prefer-const */
import { Selector } from "../classes/selector";
import { Square } from "../classes/square";
import {
  ICursorIcon,
  IResize,
  ISelectItem,
  ISelectItems,
} from "../types/types";
import { Inside } from "./isInside";
import { resizeHelper } from "./resize";

export const SelectChecker = ({
  hitctx,
  event,
  colorIds,
  selectedItems,
  selector,
}: {
  colorIds: { [key: string]: ISelectItem | Selector };
  hitctx: CanvasRenderingContext2D | null;
  event: MouseEvent;
  selectedItems: ISelectItems;
  selector: Selector | null;
}) => {
  let selectItem: ISelectItem | null = null;
  let selectStates:
    | IResize
    | ("move" | "moveMany" | "select" | "notFound" | "resizeMany") = "notFound";
  let cursorType: ICursorIcon = "auto";
  if (selectedItems.length === 0) {
    const pixel = hitctx!.getImageData(event.x, event.y, 1, 1).data;
    // console.log(pixel);
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    const Item = colorIds[color];
    if (Item) {
      selectStates = "select";
      cursorType = "move";
      selectItem = Item as Square;
    }
  } else if (selector) {
    const pixel = hitctx!.getImageData(event.x, event.y, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    // console.log(pixel);
    if (color === selector.colorId) {
      if (!Inside.isCursorInSquare({ Item: selector, event, offset: -10 })) {
        const onTop = selector.corners.top + 10 > event.y;
        const onBottom = selector.corners.bottom - 10 < event.y;
        const onLeft = selector.corners.left + 10 > event.x;
        const onRight = selector.corners.right - 10 < event.x;
        const state = resizeHelper.resizeState({
          onTop,
          onLeft,
          onBottom,
          onRight,
        });
        selectStates = state.selectStates;
        cursorType = state.cursorType;
      } else {
        selectStates = "moveMany";
        cursorType = "move";
      }
    } else {
      const shape = colorIds[color];
      if (shape) {
        selectItem = shape as Square;
        selectStates = "select";
        cursorType = "move";
      }
    }
  }

  return { selectItem, selectStates, cursorType };
};
