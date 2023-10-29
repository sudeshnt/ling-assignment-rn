import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import { LeaderBoard, LeaderBoardUser, User } from '../types';

export const getUsersListFromLeaderboardObject = (leaderboard: LeaderBoard = {}): User[] => {
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

export const getRankedUserListByBananaCount = (users: User[]): LeaderBoardUser[] => {
  if (isEmpty(users)) return [];

  let currentRank = 1;
  let currentHighestBananaCount: number;

  return orderBy(users, 'bananas', 'desc').map((user, index) => {
    if (index > 0 && user.bananas < currentHighestBananaCount) {
      currentRank++;
    }
    currentHighestBananaCount = user.bananas;
    return { ...user, rank: currentRank };
  });
};

export const generateUidToRankMap = (leaderBoardUsers: LeaderBoardUser[]) => {
  return leaderBoardUsers.reduce(
    (acc, leaderboardUser) => {
      return {
        ...acc,
        [leaderboardUser.uid]: leaderboardUser.rank,
      };
    },
    {} as Record<string, number>,
  );
};

export const getUserIndexByName = (leaderBoardUsers: LeaderBoardUser[], searchText: string) => {
  return leaderBoardUsers.findIndex((user) => {
    const regex = new RegExp(`\\b${searchText}\\b`);
    return regex.test(user.name.toLowerCase());
  });
};
