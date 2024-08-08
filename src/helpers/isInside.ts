import { Select } from "../classes/select";
import { Selector } from "../classes/selector";
import { ISelectItem } from "../types/types";

export const Inside = {
  isCursorInSquare: ({
    Item,
    event,
    offset = 10,
  }: {
    Item: ISelectItem | Selector;
    event: { x: number; y: number };
    offset?: number;
  }) => {
    if (
      Item.x - offset < event.x &&
      Item.x2 + offset > event.x &&
      Item.y - offset < event.y &&
      Item.y2 + offset > event.y
    ) {
      return true;
    } else return false;
  },
  isItemInSelect: (Item: ISelectItem, select: Select) => {
    const { bottom, left, right, top } = Item.getBoundaries();
    const {
      bottom: select_bottom,
      left: select_left,
      right: select_right,
      top: select_top,
    } = select.corners;
    if (
      top > select_top &&
      left > select_left &&
      bottom < select_bottom &&
      right < select_right
    ) {
      return true;
    }
    return false;
  },
};
