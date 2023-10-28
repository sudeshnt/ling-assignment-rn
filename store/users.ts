import { create } from "zustand";
import { User } from "../types";
import { UserState } from "./types";

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  populateUsers: (users: User[]) => {
    try {
      set({ users });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useUserStore;
