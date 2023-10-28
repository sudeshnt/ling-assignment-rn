import { LeaderBoardUser, User } from "../types";

export type UserState = {
  allUsers: LeaderBoardUser[];
  userList: LeaderBoardUser[];
  bananaLeaderboard: LeaderBoardUser[];
  searchText: string;
  currentPage: number;
  totalPages: number;
  isSearchData: boolean;
  isLoading: boolean;
  populateAllUsers: (users: User[]) => void;
  searchUser: (name: string) => void;
  fetchNextUserPage: () => void;
  resetUserList: () => void;
  setSearchText: (text: string) => void;
};
