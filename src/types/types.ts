import { Ellipse } from "../classes/ellipse";
import { Square } from "../classes/square";

export type ICanvasType = "move" | "square" | "ellipse";
export type ISelectItem = Square | Ellipse;
export type ISelectItems = ISelectItem[];
export type IResize =
  | "resize-top"
  | "resize-bottom"
  | "resize-left"
  | "resize-right"
  | "resize-top-left"
  | "resize-top-right"
  | "resize-bottom-left"
  | "resize-bottom-right";
export type ICursorIcon =
  | "auto"
  | "move"
  | "col-resize"
  | "row-resize"
  | "nesw-resize"
  | "nwse-resize";
