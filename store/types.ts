import { User } from "../types";

export type UserState = {
  users: User[];
  populateUsers: (users: User[]) => void;
};
