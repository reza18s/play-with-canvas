import { ISelectItem } from "../types/types";

export const Inside = ({
  Item,
  event,
  offset = 5,
}: {
  Item: ISelectItem;
  event: MouseEvent;
  offset?: number;
}) => {
  if (
    Item.x - offset < event.x &&
    Item.x + Item.width + offset > event.x &&
    Item.y - offset < event.y &&
    Item.y + Item.height + offset > event.y
  ) {
    return true;
  } else return false;
};
