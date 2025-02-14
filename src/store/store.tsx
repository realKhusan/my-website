import { create } from "zustand";

interface IUserStore {
  projectsChecked: string[];
  setProjectChecked: (fn: () => string[]) => void;
}

export const UseSctore = create<IUserStore>()((set) => ({
  projectsChecked: [],
  setProjectChecked: (val: () => string[]) =>
    set(() => ({
      projectsChecked: val(),
    })),
}));
