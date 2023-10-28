import isEmpty from "lodash/isEmpty";
import { LeaderBoard, User } from "../types";

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
