import { create } from "zustand";
import { User } from "../types";
import {
  generateUidToRankMap,
  getRankedUserListByBananaCount,
  getUserIndexByName,
} from "../utils";
import { UserState } from "./types";

const NO_OF_FILTERED_USERS = 10;
const PAGE_SIZE = 100;

const useUserStore = create<UserState>((set, get) => ({
  allUsers: [],
  bananaLeaderboard: [],
  userList: [],
  searchText: "",
  currentPage: 1,
  totalPages: 1,
  isSearchData: false,
  isLoading: false,
  populateAllUsers: (users: User[]) => {
    const bananaLeaderboard = getRankedUserListByBananaCount(users);
    const uidToRankMap = generateUidToRankMap(bananaLeaderboard);
    const allUsersWithRank = users.map((user) => ({
      ...user,
      rank: uidToRankMap[user.uid],
    }));
    const totalPages = Math.ceil(allUsersWithRank.length / PAGE_SIZE);
    set({
      bananaLeaderboard,
      allUsers: allUsersWithRank,
      userList: allUsersWithRank.slice(0, PAGE_SIZE),
      totalPages,
    });
  },
  searchUser: (searchText: string) => {
    try {
      if (!searchText) return;
      set({ isLoading: true });
      const { bananaLeaderboard } = get();
      const userIndex = getUserIndexByName(bananaLeaderboard, searchText);
      if (userIndex < 0) {
        set({ userList: [], isSearchData: true, isLoading: false });
        throw new Error(
          "This user name does not exist! Please specify an existing user name!"
        );
      }
      const topUsers = bananaLeaderboard.slice(0, NO_OF_FILTERED_USERS);
      const searchedUser = {
        ...bananaLeaderboard[userIndex],
        isSearchedUser: true,
      };
      const lastIndex = NO_OF_FILTERED_USERS - 1;
      const replacingIndex = userIndex > lastIndex ? lastIndex : userIndex;
      topUsers[replacingIndex] = searchedUser;
      set({ userList: topUsers, isSearchData: true, isLoading: false });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
  fetchNextUserPage: () => {
    set({ isLoading: true });
    const { currentPage, allUsers, userList } = get();
    const offset = currentPage * PAGE_SIZE;
    const nextPageData = allUsers.slice(offset, offset + PAGE_SIZE);
    set({
      userList: [...userList, ...nextPageData],
      currentPage: currentPage + 1,
      isLoading: false,
    });
  },
  resetUserList: () => {
    const { allUsers } = get();
    set({
      userList: allUsers.slice(0, PAGE_SIZE),
      isSearchData: false,
      currentPage: 1,
    });
  },
  setSearchText: (text: string) => {
    set({ searchText: text });
  },
}));

export default useUserStore;
