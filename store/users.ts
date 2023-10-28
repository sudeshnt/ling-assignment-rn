import { create } from "zustand";
import { User } from "../types";
import { getSortedBananaLeaderBoard } from "../utils";
import { UserState } from "./types";

const NO_OF_FILTERED_USERS = 10;
const PAGE_SIZE = 20;

const useUserStore = create<UserState>((set, get) => ({
  allUsers: [],
  bananaLeaderboard: [],
  userList: [],
  searchText: "",
  populateAllUsers: (users: User[]) => {
    const bananaLeaderboard = getSortedBananaLeaderBoard(users);
    const uidToRankMap = bananaLeaderboard.reduce((acc, leaderboardUser) => {
      return {
        ...acc,
        [leaderboardUser.uid]: leaderboardUser.rank,
      };
    }, {} as Record<string, number>);
    const allUsersWithRank = users.map((user) => ({
      ...user,
      rank: uidToRankMap[user.uid],
    }));
    set({
      bananaLeaderboard,
      allUsers: allUsersWithRank,
      userList: allUsersWithRank.slice(0, PAGE_SIZE),
    });
  },
  searchUser: (searchText: string) => {
    try {
      if (!searchText) return;
      const { bananaLeaderboard } = get();
      const userIndex = bananaLeaderboard.findIndex((user) =>
        user.name.toLowerCase().includes(searchText)
      );
      if (userIndex < 0) {
        set({ userList: [] });
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
      set({ userList: topUsers });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
  resetUserList: () => {
    set({ userList: get().allUsers.slice(0, PAGE_SIZE) });
  },
  setSearchText: (text: string) => {
    set({ searchText: text });
  },
}));

export default useUserStore;
