/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ISelectItem } from "../types/types";
import { Selector } from "../classes/selector";

export interface IStore {
  colorsId: { [key: string]: ISelectItem | Selector };
}
export interface Actions {
  setColorsId: (key: string, val: ISelectItem | Selector) => void;
  getColorIs: () => { [key: string]: ISelectItem | Selector };
}

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  colorsId: {},
};

export const useColorsId = create<Store>()(
  devtools((set, get) => ({
    ...defaultInitState,
    setColorsId: (key, val) => {
      set({ colorsId: { ...get().colorsId, [key]: val } });
    },
    getColorIs: () => get().colorsId,
  })),
);
