import { Selector } from "../classes/selector";
import { ISelectItem } from "../types/types";

export const resizeHelper = {
  ResizeGroup: ({
    selectedItems,
    selector,
    type,
  }: {
    selectedItems: ISelectItem[];
    selector: Selector;
    type: "x" | "y" | "xy";
  }) => {
    let heightPercent: number = 1;
    let widthPercent: number = 1;

    if (selector) {
      heightPercent = (selector.y2 - selector.y) / selector.lastHeight;
      widthPercent = (selector.x2 - selector.x) / selector.lastWidth;
    }
    // const between = (num1: number, bet1: number, bet2: number, ret: number) => {
    //   return num1 < bet1 && num1 > bet2 ? ret : num1;
    // };
    selectedItems.map((item) => {
      if (type === "xy") {
        const itemY = (item.selectY - selector!.selectY) * +heightPercent;
        const itemY2 = (selector!.selectY2 - item.selectY2) * +heightPercent;
        const itemX = (item.selectX - selector!.selectX) * +widthPercent;
        const itemX2 = (selector!.selectX2 - item.selectX2) * +widthPercent;

        item.resize({
          y: selector!.y + +itemY,
          y2: selector!.y2 - itemY2,
          x: selector!.x + +itemX,
          x2: selector!.x2 - itemX2,
        });
      } else if (type === "x") {
        const itemX = (item.selectX - selector!.selectX) * +widthPercent;
        const itemX2 = (selector!.selectX2 - item.selectX2) * +widthPercent;
        item.resize({
          x: selector!.x + +itemX,
          x2: selector!.x2 - itemX2,
        });
      } else if (type === "y") {
        selectedItems.map((item) => {
          const itemY = (item.selectY - selector!.selectY) * +heightPercent;
          const itemY2 = (selector!.selectY2 - item.selectY2) * +heightPercent;
          console.log("y2", selector!.selectY2 - item.selectY2);
          console.log(item.selectY - selector!.selectY);
          item.resize({
            y: selector!.y + itemY,
            y2: selector!.y2 - itemY2,
          });
        });
      }
    });
  },
};
