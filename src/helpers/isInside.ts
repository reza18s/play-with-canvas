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
    Item.x - offset < event.x &&
    Item.x2 + offset > event.x &&
    Item.y - offset < event.y &&
    Item.y2 + offset > event.y
  ) {
    return true;
  } else return false;
};
