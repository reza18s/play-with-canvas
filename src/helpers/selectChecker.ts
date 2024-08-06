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
    | ("move" | "moveMany" | "select" | "notFound" | "resizeMany" | "rotate") =
    "notFound";
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
    if (selector.colorIds[color]) {
      //@ts-ignore
      selectStates = selector.colorIds[color];
      console.log(selector.colorIds[color]);
    } else if (color === selector.colorId) {
      selectStates = "moveMany";
      cursorType = "move";
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
