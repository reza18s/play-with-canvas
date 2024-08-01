/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IStore {
}
export interface Actions  {}

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
};

export const useLocalStore = create<Store>()(
  devtools(
    persist(
      () => ({
        ...defaultInitState,
      }),

      { name: "board-user" },
    ),
  ),
);
