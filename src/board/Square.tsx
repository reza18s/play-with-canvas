import { useEffect, useRef } from "react";
import { Hooks } from "../Hooks";
import { useLocalStore } from "../store/useLocalStore";
import { Square } from "../classes/square";
import { SelectChecker } from "../helpers/selectChecker";
import { Select } from "../classes/select";
import {
  ICursorIcon,
  IResize,
  ISelectItem,
  ISelectItems,
} from "../types/types";
import { Selector } from "../classes/selector";
import { resizeHelper } from "../helpers/resize";

export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  const hitCanv = document.createElement("canvas");
  hitCanv.width = canv!.width;
  hitCanv.height = canv!.height;
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  const hitctx = hitCanv.getContext("2d", { willReadFrequently: true });
  const { getCanvasType, setCanvasType } = useLocalStore();
  const requestRef = useRef<number>(0);
  let isDrawing = false;
  const Items: ISelectItems = [];
  let newItem: ISelectItem | null;
  let selectedItems: ISelectItems = [];
  let select: Select | null;
  let selector: Selector | null;
  let move: boolean = false;
  let resize: IResize | null = null;
  let cursorIcon: ICursorIcon;
  Hooks.Resize(canv);
  Hooks.useAddEventListener("mousemove", (event: MouseEvent) => {
    // to update the size off square when the client draws
    if (getCanvasType() == "square" && Items && isDrawing) {
      newItem?.update(event.x, event.y);
    }
    // to move the selected item
    if (getCanvasType() == "move" && selectedItems.length !== 0 && move) {
      selectedItems.map((el) => {
        el.move(event.x, event.y);
      });
      selector?.move(event.x, event.y);
    }
    // to change the icon off the cursor (it can use to check there is item or not )
    if (getCanvasType() === "move") {
      if (move) {
        document.body.style.cursor = "move";
      } else if (resize) {
        document.body.style.cursor = cursorIcon;
      } else {
        const { cursorType } = SelectChecker({
          Items,
          event,
          selectedItem: selectedItems,
          selector,
        });
        if (cursorType!) {
          document.body.style.cursor = cursorType;
        }
      }
    }
    // to handel resize event
    if (getCanvasType() === "move" && resize) {
      switch (resize) {
        case "resize-top":
          if (selector) {
            selector?.resize({ y: event.y - selector.selectY });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "y" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                y: event.y,
              });
            });
          }
          break;
        case "resize-bottom":
          if (selector) {
            selector?.resize({ y2: event.y + selector.selectY2 });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "y" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                y2: event.y,
              });
            });
          }
          break;
        case "resize-left":
          if (selector) {
            selector?.resize({ x: event.x + selector.selectX });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "x" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                x: event.x,
              });
            });
          }
          break;
        case "resize-right":
          if (selector) {
            selector?.resize({ x2: event.x + selector.selectX2 });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "x" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                x2: event.x,
              });
            });
          }
          break;
        case "resize-top-left":
          if (selector) {
            selector?.resize({
              x: event.x + selector.selectX,
              y: event.y - selector.selectY,
            });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "xy" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                y: event.y,
                x: event.x,
              });
            });
          }
          break;
        case "resize-top-right":
          if (selector) {
            selector?.resize({
              x2: event.x + selector.selectX2,
              y: event.y - selector.selectY,
            });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "xy" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                y: event.y,
                x2: event.x,
              });
            });
          }
          break;
        case "resize-bottom-left":
          if (selector) {
            selector?.resize({
              x: event.x + selector.selectX,
              y2: event.y - selector.selectY2,
            });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "xy" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                y2: event.y,
                x: event.x,
              });
            });
          }
          break;
        case "resize-bottom-right":
          if (selector) {
            selector?.resize({
              x2: event.x + selector.selectX2,
              y2: event.y - selector.selectY2,
            });
            resizeHelper.ResizeGroup({ selectedItems, selector, type: "xy" });
          } else {
            selectedItems.map((item) => {
              item.resize({
                y2: event.y,
                x2: event.x,
              });
            });
          }
          break;
      }
    }
    // to update the size off select square
    if (select) select.update(event.x, event.y);
  });
  Hooks.useAddEventListener("mousedown", (event: MouseEvent) => {
    // to save the position and draw the square
    if (getCanvasType() === "square") {
      isDrawing = true;
      newItem = new Square(event.x, event.y);
    }
    // to move the item
    if (getCanvasType() === "move") {
      const { selectItem, selectStates, cursorType } = SelectChecker({
        Items,
        event,
        selectedItem: selectedItems,
        selector,
      });
      if (selectStates!) {
        switch (selectStates) {
          case "notFound":
            selectedItems = [];
            move = false;
            select = new Select(event.x, event.y);
            selector = null;
            break;
          case "move":
            selectedItems[0]!.selectX = event.x - selectedItems[0]!.x;
            selectedItems[0]!.selectY = event.y - selectedItems[0]!.y;
            move = true;
            break;
          case "moveMany":
            selectedItems.map((sqrs) => {
              sqrs!.selectX = event.x - sqrs!.x;
              sqrs!.selectY = event.y - sqrs!.y;
            });
            if (selector) {
              selector.selectX = event.x - selector.x;
              selector.selectY = event.y - selector.y;
            }
            move = true;
            break;
          case "select":
            selectItem!.selectX = event.x - selectItem!.x;
            selectItem!.selectY = event.y - selectItem!.y;
            move = true;
            selectedItems = [selectItem!];
            break;
          case "resize-top":
          case "resize-left":
          case "resize-top-left":
          case "resize-top-right":
          case "resize-bottom-left":
          case "resize-bottom-right":
          case "resize-bottom":
          case "resize-right":
            selectedItems?.map((item) => {
              item.selectX = item.x - event.x;
              item.selectY = item.y - event.y;
              item.selectX2 = item.x2 - event.x;
              item.selectY2 = item.y2 - event.y;
            });
            if (selector) {
              selector.selectX = selector.x - event.x;
              selector.selectY = selector.y - event.y;
              selector.selectX2 = selector.x2 - event.x;
              selector.selectY2 = selector.y2 - event.y;
              selector!.lastWidth = selector!.x2 - selector!.x;
              selector!.lastHeight = selector!.y2 - selector!.y;
            }
            cursorIcon = cursorType;
            resize = selectStates;
            break;
        }
      }
    }
  });

  Hooks.useAddEventListener("mouseup", () => {
    isDrawing = false;
    resize = null;
    // to add new item array and select it
    if (newItem) {
      Items.push(newItem);
      selectedItems = [newItem];
      newItem = null;
    }
    //to change back the type of the canvas to move after drawing
    if (getCanvasType() !== "move") {
      setCanvasType("move");
    }
    // to map the item and check if the  item.x is more than item.x2 or item.y is more than item.y2 and if its true it will replace their values
    Items.map((Item) => {
      if (Item.x > Item.x2) {
        const x = Item.x;
        Item.x = Item.x2;
        Item.x2 = x;
      }
      if (Item.y > Item.y2) {
        const y = Item.y;
        Item.y = Item.y2;
        Item.y2 = y;
      }
    });
    if (selector) {
      if (selector.x > selector.x2) {
        const x = selector.x;
        selector.x = selector.x2;
        selector.x2 = x;
      }
      if (selector.y > selector.y2) {
        const y = selector.y;
        selector.y = selector.y2;
        selector.y2 = y;
      }
    }
    // to select the item
    if (select) {
      // to save the maximum corners
      let selector_top: number,
        selector_bottom: number,
        selector_left: number,
        selector_right: number;
      let showSelector = true;
      selectedItems = Items.filter((square, index) => {
        // it will check for item witch is inside the select and return it
        if (
          square.corners.top > select!.corners.top &&
          square.corners.left > select!.corners.left &&
          square.corners.bottom < select!.corners.bottom &&
          square.corners.right < select!.corners.right
        ) {
          if (
            !(
              selector_top &&
              selector_left &&
              selector_right &&
              selector_bottom
            )
          ) {
            selector_top = square.corners.top;
            selector_bottom = square.corners.bottom;
            selector_left = square.corners.left;
            selector_right = square.corners.right;
          } else {
            selector_top =
              selector_top > square.corners.top
                ? square.corners.top
                : selector_top;
            selector_bottom =
              selector_bottom < square.corners.bottom
                ? square.corners.bottom
                : selector_bottom;
            selector_left =
              selector_left > square.corners.left
                ? square.corners.left
                : selector_left;
            selector_right =
              selector_right < square.corners.right
                ? square.corners.right
                : selector_right;
          }
          return selectedItems.push(square);
        }
      });
      selectedItems.map((square) => {
        // it will check the maximum corners belong to one item and if that true it wont show the selector
        if (
          square.corners.top == selector_top &&
          square.corners.bottom == selector_bottom &&
          square.corners.left == selector_left &&
          square.corners.right == selector_right
        ) {
          showSelector = false;
        }
      });
      if (selectedItems.length > 1) {
        selector = new Selector(selector_left!, selector_top!).update(
          selector_right!,
          selector_bottom!,
        );
        selector.show = showSelector;
      }
      select = null;
    }
    console.log(Items);
    move = false;
  });
  const Animation = () => {
    ctx?.beginPath();
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    if (Items) {
      Items.map((square) => {
        square.draw(ctx, hitctx, 0);
      });
    }
    selectedItems.map((square) => {
      square.select(ctx, hitctx, 160);
    });
    select?.draw(ctx, hitctx, 190);
    selector?.draw(ctx, hitctx, 190);
    newItem?.draw(ctx, hitctx, 0);
    requestRef.current = requestAnimationFrame(() => Animation());
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(Animation);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <></>;
}
