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
  let selectStates: "move" | "moveMany" | "select" | "notFound" | "resize" =
    "notFound";
  for (let i = 0; i < Items.length; i++) {
    const Item = Items[Items.length - i - 1];
    if (Inside({ Item, event })) {
      if (
        selectedItem.length !== 0 &&
        selectedItem.find((el) => el.id === Item.id)
      ) {
        // in this case the already selected and we check if it is one or more
        if (selectedItem.length === 1) {
          selectStates = "move";
        } else {
          selectStates = "moveMany";
        }
        break;
      } else if (!Inside({ Item, event, offset: -5 })) {
        // in this case there is no item selected so we select one and push it to select array
        selectStates = "select";
        selectItem = Item;
        break;
      } else {
        //in this case there no item selected
        selectItem = null;
        selectStates = "notFound";
      }
    } else {
      if (selector) {
        if (Inside({ Item: selector, event })) {
          selectStates = "moveMany";
        }
      } else {
        //in this case there no item selected where the client clicked
        selectItem = null;
        selectStates = "notFound";
      }
    }
  }
  return { selectSquare: selectItem, selectStates };
};
