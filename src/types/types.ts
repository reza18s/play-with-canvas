import { Ellipse } from "../classes/ellipse";
import { Line } from "../classes/line";
import { Square } from "../classes/square";
import { Triangle } from "../classes/triangle";

export type ICanvasType = "move" | "square" | "ellipse" | "triangle";
export type ISelectItem = Square | Ellipse | Triangle | Line;
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
  | "grab"
  | "move"
  | "col-resize"
  | "row-resize"
  | "nesw-resize"
  | "nwse-resize";
