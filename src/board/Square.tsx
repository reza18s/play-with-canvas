import { useEffect, useRef } from "react";
import { Hooks } from "../Hooks";
import { useLocalStore } from "../store/useLocalStore";
import { Square } from "../classes/square";
import { SelectChecker } from "../helpers/selectChecker";
import { Select } from "../classes/select";
import { ISelectItems } from "../types/types";
import { Selector } from "../classes/selector";

export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  ctx?.setLineDash([6]);
  const { getCanvasType, setCanvasType } = useLocalStore();
  const requestRef = useRef<number>(0);
  let isDrawing = false;

  const mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    radius: 1000,
  };
  const Items: ISelectItems = [];
  let selectedItem: ISelectItems = [];
  let select: Select | null;
  let selector: Selector | null;

  let move: boolean = false;
  let resize:
    | "resize-top"
    | "resize-bottom"
    | "resize-left"
    | "resize-right"
    | "resize-top-left"
    | "resize-top-right"
    | "resize-bottom-left"
    | "resize-bottom-right"
    | null;
  Hooks.Resize(canv);
  Hooks.useAddEventListener("mousemove", (event: MouseEvent) => {
    // to save the mouse position on client
    mouse.x = event.x;
    mouse.y = event.y;
    // to update the size off square when the client draws
    if (getCanvasType() == "square" && Items && isDrawing) {
      Items[Items.length - 1].update(mouse.x, mouse.y);
    }
    // to move the selected item
    if (getCanvasType() == "move" && selectedItem.length !== 0 && move) {
      selectedItem.map((el) => {
        el.move(event.x, event.y);
      });
      selector?.move(event.x, event.y);
    }
    // to change the icon off the cursor (it can use to check there is item or not )
    if (getCanvasType() === "move") {
      const { cursorType } = SelectChecker({
        Items,
        event,
        selectedItem,
        selector,
      });
      if (cursorType!) {
        document.body.style.cursor = cursorType;
      }
    }
    // if (getCanvasType() === "move" && resize) {
    //   switch (resize) {
    //     case "resize-top":
    //       selectedItem.map((item) => {
    //         item.resize({
    //           y: event.y,
    //           x2: item.resize_height - (event.y - item.selectY),
    //         });
    //       });
    //       break;
    //     case "resize-bottom":
    //     case "resize-left":
    //     case "resize-right":
    //     case "resize-top-left":
    //     case "resize-top-right":
    //     case "resize-bottom-left":
    //     case "resize-bottom-right":
    //   }
    // }
    // to update the size off select square
    if (select) select.update(event.x, event.y).draw(ctx, 190);
  });
  Hooks.useAddEventListener("mousedown", (event: MouseEvent) => {
    // to save the position and draw the square
    if (getCanvasType() === "square") {
      isDrawing = true;
      Items.push(new Square(event.x, event.y));
    }
    // to move the item
    if (getCanvasType() === "move") {
      const { selectItem, selectStates } = SelectChecker({
        Items,
        event,
        selectedItem,
        selector,
      });
      if (selectStates!) {
        switch (selectStates) {
          case "notFound":
            selectedItem = [];
            move = false;
            select = new Select(mouse.x, mouse.y);
            selector = null;
            break;
          case "move":
            selectedItem[0]!.selectX = event.x - selectedItem[0]!.x;
            selectedItem[0]!.selectY = event.y - selectedItem[0]!.y;
            move = true;
            break;
          case "moveMany":
            selectedItem.map((sqrs) => {
              sqrs!.selectX = event.x - sqrs!.x;
              sqrs!.selectY = event.y - sqrs!.y;
            });
            selector!.selectX = event.x - selector!.x;
            selector!.selectY = event.y - selector!.y;
            move = true;
            break;
          case "select":
            selectItem!.selectX = event.x - selectItem!.x;
            selectItem!.selectY = event.y - selectItem!.y;
            move = true;
            selectedItem = [selectItem!];
            break;
          case "resize-top":
          case "resize-left":
          case "resize-top-left":
          case "resize-top-right":
          case "resize-bottom-left":
          case "resize-bottom-right":
          case "resize-bottom":
          case "resize-right":
            selectedItem?.map((item) => {
              item.selectX = event.x;
              item.selectY = event.y;
            });
            resize = selectStates;
            break;
        }
      }
    }
  });

  Hooks.useAddEventListener("mouseup", () => {
    isDrawing = false;
    resize = null;
    if (getCanvasType() !== "move") {
      setCanvasType("move");
    }
    if (select) {
      let top = 0,
        bottom = 0,
        left = 0,
        right = 0;
      selectedItem = Items.filter((square, index) => {
        if (
          square.corners.top > select!.corners.top &&
          square.corners.left > select!.corners.left &&
          square.corners.bottom < select!.corners.bottom &&
          square.corners.right < select!.corners.right
        ) {
          if (index === 0) {
            top = square.corners.top;
            bottom = square.corners.bottom;
            left = square.corners.left;
            right = square.corners.right;
          }
          top = top > square.corners.top ? square.corners.top : top;
          bottom =
            bottom < square.corners.bottom ? square.corners.bottom : bottom;
          left = left > square.corners.left ? square.corners.left : left;
          right = right < square.corners.right ? square.corners.right : right;
          return selectedItem.push(square);
        }
      });
      if (selectedItem.length > 1) {
        selector = new Selector(left - 5, top - 5).update(
          right + 5,
          bottom + 5,
        );
      }
      select = null;
    }
    move = false;
  });
  const Animation = () => {
    ctx?.beginPath();
    ctx?.clearRect(0, 0, canv!.width, canv!.height);
    if (Items) {
      Items.map((square) => {
        square.draw(ctx, 0);
      });
    }
    if (Items) {
      selectedItem.map((square) => {
        square.select(ctx, 160);
      });
    }
    select?.draw(ctx, 190);

    selector?.draw(ctx, 190);
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
