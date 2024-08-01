/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ICanvasType } from "../types/types";

export interface IStore {
  canvasType: ICanvasType;
}
export interface Actions {
  setCanvasType: (type: ICanvasType) => void;
  getCanvasType: () => ICanvasType;
}

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  canvasType: "move",
};

export const useLocalStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultInitState,
        setCanvasType: (type) => {
          set({ canvasType: type });
        },
        getCanvasType: () => get().canvasType,
      }),

      { name: "board-user" },
    ),
  ),
);
