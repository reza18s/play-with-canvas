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
    event: MouseEvent;
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
    if (
      Item.corners.top > select!.corners.top &&
      Item.corners.left > select!.corners.left &&
      Item.corners.bottom < select!.corners.bottom &&
      Item.corners.right < select!.corners.right
    ) {
      return true;
    }
    return false;
  },
};
