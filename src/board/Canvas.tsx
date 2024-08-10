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
import { generateColorId } from "../helpers/generateColorId";
import { Inside } from "../helpers/isInside";
import { calcSelectorCorners } from "../helpers/calcSelectorCorners";
import { Ellipse } from "../classes/ellipse";
import { Triangle } from "../classes/triangle";
import { useColorsId } from "../store/useColor";

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
  let resize: IResize | "rotate" | null = null;
  let cursorIcon: ICursorIcon;
  const { colorsId, setColorsId, getColorIs } = useColorsId((state) => state);

  Hooks.Resize(canv);
  Hooks.useAddEventListener("mousemove", (event: MouseEvent) => {
    // to update the size off square when the client draws
    if (
      (getCanvasType() == "square" ||
        getCanvasType() == "ellipse" ||
        getCanvasType() == "triangle") &&
      Items &&
      isDrawing
    ) {
      newItem?.update(event.x, event.y);
    }
    // to move the selected item
    if (getCanvasType() == "move" && selectedItems.length !== 0 && move) {
      selectedItems.map((el) => {
        el.move(event.x, event.y);
      });
      selector?.move(event.x, event.y);
    }
    // // to change the icon off the cursor (it can use to check there is item or not )
    if (getCanvasType() === "move") {
      if (move) {
        document.body.style.cursor = "move";
      } else if (resize) {
        document.body.style.cursor = cursorIcon;
      } else {
        const { cursorType } = SelectChecker({
          hitctx,
          colorsId: getColorIs(),
          event,
          selectedItems,
          selector,
        });
        if (cursorType!) {
          document.body.style.cursor = cursorType;
        }
      }
    }
    // to handel resize event
    if (getCanvasType() === "move" && resize) {
      const shouldHaveAspectRatio: boolean =
        selectedItems.length > 1 ? true : false;
      switch (resize) {
        case "rotate":
          if (selector) {
            const { cx, cy } = selector.calcCenter();
            selector.setRotate(event.x, event.y, cx, cy);
            selectedItems.map((item) => {
              item.setRotate(event.x, event.y, cx, cy);
            });
          }
          break;
        case "resize-top":
          if (selector) {
            selector?.resize({ y: event.y + selector.selectY });
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
            const { cx, cy } = selector.calcCenter();
            const { pointA, pointC } = resizeHelper.resizeSingleElement(
              { x: event.x, y: event.y },
              { x: cx, y: cy },
              { x: selector.x2, y: selector.y2 },
              selector.rotate,
            );
            if (shouldHaveAspectRatio) {
              const aspectRatio = selector.lastHeight / selector.lastWidth;
              const [w, h] = [
                pointA[0] - pointC[0],
                (pointA[0] - pointC[0]) * aspectRatio,
              ];

              selector.x = pointA[0] - w;
              selector.y = pointA[1] - h;
              selector.x2 = pointA[0];
              selector.y2 = pointA[1];
            } else {
              selector.x = pointC[0];
              selector.y = pointC[1];
              selector.x2 = pointA[0];
              selector.y2 = pointA[1];
            }
            resizeHelper.ResizeGroup({
              selectedItems,
              selector,
              type: "xy",
            });
          }
          break;
        case "resize-top-right":
          if (selector) {
            const { cx, cy } = selector.calcCenter();
            const { pointA, pointC } = resizeHelper.resizeSingleElement(
              { x: event.x, y: event.y },
              { x: cx, y: cy },
              { x: selector.x, y: selector.y2 },
              selector.rotate,
            );
            if (shouldHaveAspectRatio) {
              const aspectRatio = selector.lastHeight / selector.lastWidth;
              const [w, h] = [
                pointC[0] - pointA[0],
                (pointC[0] - pointA[0]) * aspectRatio,
              ];
              console.log(pointC, pointA);
              selector.x = pointA[0];
              selector.y = pointA[1] - h;
              selector.x2 = pointA[0] + w;
              selector.y2 = pointA[1];
            } else {
              selector.x = pointA[0];
              selector.y = pointC[1];
              selector.x2 = pointC[0];
              selector.y2 = pointA[1];
            }
            resizeHelper.ResizeGroup({
              selectedItems,
              selector,
              type: "xy",
            });
          }
          break;
        case "resize-bottom-left":
          if (selector) {
            const { cx, cy } = selector.calcCenter();
            const { pointA, pointC } = resizeHelper.resizeSingleElement(
              { x: event.x, y: event.y },
              { x: cx, y: cy },
              { x: selector.x2, y: selector.y },
              selector.rotate,
            );
            if (shouldHaveAspectRatio) {
              const aspectRatio = selector.lastHeight / selector.lastWidth;
              const [w, h] = [
                pointA[0] - pointC[0],
                (pointA[0] - pointC[0]) * aspectRatio,
              ];
              console.log(pointA, pointC);
              selector.x = pointA[0] - w;
              selector.y = pointA[1];
              selector.x2 = pointA[0];
              selector.y2 = pointA[1] + h;
            } else {
              selector.x = pointC[0];
              selector.y = pointA[1];
              selector.x2 = pointA[0];
              selector.y2 = pointC[1];
            }

            resizeHelper.ResizeGroup({
              selectedItems,
              selector,
              type: "xy",
            });
          }
          break;
        case "resize-bottom-right":
          if (selector) {
            const { cx, cy } = selector.calcCenter();
            const { pointA, pointC } = resizeHelper.resizeSingleElement(
              {
                x: event.x,
                y: event.y,
              },
              { x: cx, y: cy },
              { x: selector.x, y: selector.y },
              selector.rotate,
            );
            if (shouldHaveAspectRatio) {
              const aspectRatio = selector.lastHeight / selector.lastWidth;
              const [w, h] = [
                pointC[0] - pointA[0],
                (pointC[0] - pointA[0]) * aspectRatio,
              ];

              selector.x = pointA[0];
              selector.y = pointA[1];
              selector.x2 = pointA[0] + w;
              selector.y2 = pointA[1] + h;
            } else {
              selector.x = pointA[0];
              selector.y = pointA[1];
              selector.x2 = pointC[0];
              selector.y2 = pointC[1];
            }
            resizeHelper.ResizeGroup({
              selectedItems,
              selector,
              type: "xy",
            });
          }
          break;
      }
    }
    if (select) select.update(event.x, event.y);
  });
  Hooks.useAddEventListener("mousedown", (event: MouseEvent) => {
    // to save the position and draw the square
    if (getCanvasType() === "square") {
      isDrawing = true;
      newItem = new Square(event.x, event.y, [255, 0, 25]);
      newItem.colorId = generateColorId(newItem, getColorIs(), setColorsId);
    } // to save the position and draw the square
    if (getCanvasType() === "ellipse") {
      isDrawing = true;
      newItem = new Ellipse(event.x, event.y, [255, 0, 25]);
      newItem.colorId = generateColorId(newItem, getColorIs(), setColorsId);
    }
    if (getCanvasType() === "triangle") {
      isDrawing = true;
      newItem = new Triangle(event.x, event.y, [255, 0, 25]);
      newItem.colorId = generateColorId(newItem, getColorIs(), setColorsId);
    }
    // to move the item
    if (getCanvasType() === "move") {
      const { selectItem, selectStates, cursorType } = SelectChecker({
        colorsId: getColorIs(),
        hitctx,
        event,
        selectedItems,
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
            selectedItems = [selectItem!];
            move = true;
            selector = new Selector(
              Math.min(selectItem!.x2, selectItem!.x),
              Math.min(selectItem!.y2, selectItem!.y),
              [0, 50, 255],
            ).update(
              Math.max(selectItem!.x2, selectItem!.x),
              Math.max(selectItem!.y2, selectItem!.y),
            );
            if (selector) {
              selector.selectX = event.x - selector.x;
              selector.selectY = event.y - selector.y;
              selector.show = false;
              selector.rotate = selectItem!.rotate;
            }
            break;
          case "rotate":
          case "resize-top":
          case "resize-bottom":
          case "resize-left":
          case "resize-right":
          case "resize-top-left":
          case "resize-top-right":
          case "resize-bottom-left":
          case "resize-bottom-right":
            selectedItems?.map((item) => {
              item.selectX = item.x - event.x;
              item.selectY = item.y - event.y;
              item.selectX2 = item.x2 - event.x;
              item.selectY2 = item.y2 - event.y;
              if (selectedItems.length > 1) {
                item.selectRotate = item.rotate;
              } else {
                item.selectRotate = 0;
              }
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
    if (select) {
      // to save the maximum corners
      selectedItems = Items.filter((Item) => {
        // it will check for item witch is inside the select and return it
        if (Inside.isItemInSelect(Item, select!)) {
          return selectedItems.push(Item);
        }
      });
      select = null;
    }
    if (selectedItems.length === 1 && !selector) {
      selector = new Selector(
        selectedItems[0].corners.left,
        selectedItems[0].corners.top,
        [0, 50, 255],
      ).update(selectedItems[0].corners.right, selectedItems[0].corners.bottom);
      selector.rotate = selectedItems[0].rotate;
      selector.show = false;
    } else if (selectedItems.length > 1) {
      const {
        selector_bottom,
        selector_left,
        selector_right,
        selector_top,
        showSelector,
      } = calcSelectorCorners(selectedItems);
      selector = new Selector(
        selector_left!,
        selector_top!,
        [0, 50, 255],
      ).update(selector_right!, selector_bottom!);

      selector.show = showSelector;
    }

    move = false;
  });

  const Animation = () => {
    ctx?.beginPath();
    hitctx?.beginPath();
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    hitctx?.clearRect(0, 0, canv!.width, canv!.height);
    if (Items) {
      Items.map((square) => {
        square.draw(ctx).hitDraw(hitctx);
      });
    }
    selectedItems.map((square) => {
      square.select(ctx);
    });
    select?.draw(ctx);
    newItem?.draw(ctx).hitDraw(hitctx);
    selector?.draw(ctx).hitDraw(hitctx);
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
