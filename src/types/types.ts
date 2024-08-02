import { Selector } from "../classes/selector";
import { Square } from "../classes/square";

export type ICanvasType = "move" | "square";
export type ISelectItem = Square | Selector;
export type ISelectItems = ISelectItem[];
