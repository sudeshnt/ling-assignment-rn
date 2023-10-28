import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
import { LeaderBoard, LeaderBoardUser, User } from "../types";

export const getUsersListFromLeaderboard = (
  leaderboard: LeaderBoard = {}
): User[] => {
  if (isEmpty(leaderboard)) return [];

  return Object.entries(leaderboard).map(([uid, user]) => ({
    uid,
    name: user.name,
    bananas: user.bananas,
    lastDayPlayed: user.lastDayPlayed,
    longestStreak: user.longestStreak,
    stars: user.stars,
    subscribed: user.subscribed,
  }));
};

export const getSortedBananaLeaderBoard = (
  users: User[]
): LeaderBoardUser[] => {
  return orderBy(users, "bananas", "desc").map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};
