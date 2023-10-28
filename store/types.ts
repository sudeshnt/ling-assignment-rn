import { LeaderBoardUser, User } from "../types";

export type UserState = {
  allUsers: LeaderBoardUser[];
  userList: LeaderBoardUser[];
  bananaLeaderboard: LeaderBoardUser[];
  searchText: string;
  populateAllUsers: (users: User[]) => void;
  searchUser: (name: string) => void;
  resetUserList: () => void;
  setSearchText: (text: string) => void;
};
