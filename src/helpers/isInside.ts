import { ISelectItem } from "../types/types";

export const Inside = ({
  Item,
  event,
  offset = 10,
}: {
  Item: ISelectItem;
  event: MouseEvent;
  offset?: number;
}) => {
  if (
    Item.corners.left - offset < event.x &&
    Item.corners.right + offset > event.x &&
    Item.corners.top - offset < event.y &&
    Item.corners.bottom + offset > event.y
  ) {
    return true;
  } else return false;
};
