import { Selector } from "../classes/selector";
import { Square } from "../classes/square";
import { ISelectItems } from "../types/types";
import { Inside } from "./isInside";

export const SelectChecker = ({
  Items,
  event,
  selectedItem,
  selector,
}: {
  Items: ISelectItems;
  event: MouseEvent;
  selectedItem: ISelectItems;
  selector: Selector | null;
}) => {
  let selectItem: Square | Selector | null = null;
  let selectStates:
    | "move"
    | "moveMany"
    | "select"
    | "notFound"
    | "resize-top"
    | "resize-bottom"
    | "resize-left"
    | "resize-right"
    | "resize-top-left"
    | "resize-top-right"
    | "resize-bottom-left"
    | "resize-bottom-right"
    | "resizeMany" = "notFound";
  let cursorType:
    | "auto"
    | "move"
    | "col-resize"
    | "row-resize"
    | "nesw-resize"
    | "nwse-resize" = "auto";
  for (let i = 0; i < Items.length; i++) {
    const Item = Items[Items.length - i - 1];
    if (Inside({ Item, event })) {
      if (
        selectedItem.length !== 0 &&
        selectedItem.find((el) => el.id === Item.id)
      ) {
        // in this case the already selected and we check if it is one or more
        if (selectedItem.length === 1) {
          if (!Inside({ Item, event, offset: -10 })) {
            if (
              Item.corners.top + 10 > event.y &&
              Item.corners.left + 10 > event.x
            ) {
              selectStates = "resize-top-left";
              cursorType = "nwse-resize";
            } else if (
              Item.corners.top + 10 > event.y &&
              Item.corners.right - 10 < event.x
            ) {
              selectStates = "resize-top-right";
              cursorType = "nesw-resize";
            } else if (
              Item.corners.bottom - 10 < event.y &&
              Item.corners.left + 10 > event.x
            ) {
              selectStates = "resize-bottom-left";
              cursorType = "nesw-resize";
            } else if (
              Item.corners.bottom - 10 < event.y &&
              Item.corners.right - 10 < event.x
            ) {
              selectStates = "resize-bottom-right";
              cursorType = "nwse-resize";
            } else if (Item.corners.top + 10 > event.y) {
              selectStates = "resize-top";
              cursorType = "row-resize";
            } else if (Item.corners.left + 10 > event.x) {
              selectStates = "resize-left";
              cursorType = "col-resize";
            } else if (Item.corners.bottom - 10 < event.y) {
              selectStates = "resize-bottom";
              cursorType = "row-resize";
            } else if (Item.corners.right - 10 < event.x) {
              selectStates = "resize-right";
              cursorType = "col-resize";
            }
          } else {
            selectStates = "move";
            cursorType = "move";
          }
        } else {
          selectStates = "moveMany";
          cursorType = "move";
        }
        break;
      } else if (!Inside({ Item, event, offset: -5 })) {
        // in this case there is no item selected so we select one and push it to select array
        selectStates = "select";
        cursorType = "move";
        selectItem = Item;
        break;
      } else {
        //in this case there no item selected
        selectItem = null;
        selectStates = "notFound";
        cursorType = "auto";
      }
    } else {
      if (selector) {
        if (Inside({ Item: selector, event })) {
          selectStates = "moveMany";

          cursorType = "move";
        }
      } else {
        //in this case there no item selected where the client clicked
        selectItem = null;
        selectStates = "notFound";
        cursorType = "auto";
      }
    }
  }
  return { selectItem, selectStates, cursorType };
};
