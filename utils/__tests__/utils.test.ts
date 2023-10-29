import {
  generateUidToRankMap,
  getRankedUserListByBananaCount,
  getUserIndexByName,
  getUsersListFromLeaderboardObject,
} from '..';
import { LeaderBoardUser, User } from '../../types';

describe('getUsersListFromLeaderboardObject', () => {
  it('should return an empty array if leaderboard is empty', () => {
    const leaderboard = {};
    const result = getUsersListFromLeaderboardObject(leaderboard);
    expect(result).toEqual([]);
  });

  it('should return an array of users when leaderboard is not empty', () => {
    const leaderboard = {
      '1': {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'John',
        stars: 20,
        subscribed: true,
        uid: '1',
      },
      '2': {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Jane',
        stars: 30,
        subscribed: false,
        uid: '2',
      },
    };
    const result = getUsersListFromLeaderboardObject(leaderboard);
    expect(result).toEqual([
      {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'John',
        stars: 20,
        subscribed: true,
        uid: '1',
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Jane',
        stars: 30,
        subscribed: false,
        uid: '2',
      },
    ]);
  });
});

describe('getRankedUserListByBananaCount', () => {
  it('should return an empty array if users array is empty', () => {
    const users: User[] = [];
    const result = getRankedUserListByBananaCount(users);
    expect(result).toEqual([]);
  });

  it('should correctly rank users by banana count', () => {
    const users = [
      {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'John',
        stars: 20,
        subscribed: true,
        uid: '1',
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Jane',
        stars: 30,
        subscribed: false,
        uid: '2',
      },
      {
        bananas: 5,
        lastDayPlayed: '2023-10-26',
        longestStreak: 3,
        name: 'Doe',
        stars: 25,
        subscribed: true,
        uid: '3',
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-26',
        longestStreak: 3,
        name: 'Doe',
        stars: 25,
        subscribed: true,
        uid: '3',
      },
    ];
    const result = getRankedUserListByBananaCount(users);
    expect(result).toEqual([
      {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Jane',
        stars: 30,
        subscribed: false,
        uid: '2',
        rank: 1,
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-26',
        longestStreak: 3,
        name: 'Doe',
        stars: 25,
        subscribed: true,
        uid: '3',
        rank: 1,
      },
      {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'John',
        stars: 20,
        subscribed: true,
        uid: '1',
        rank: 2,
      },
      {
        bananas: 5,
        lastDayPlayed: '2023-10-26',
        longestStreak: 3,
        name: 'Doe',
        stars: 25,
        subscribed: true,
        uid: '3',
        rank: 3,
      },
    ]);
  });
});

describe('generateUidToRankMap', () => {
  it('should return an empty object if leaderBoardUsers array is empty', () => {
    const leaderBoardUsers: LeaderBoardUser[] = [];
    const result = generateUidToRankMap(leaderBoardUsers);
    expect(result).toEqual({});
  });

  it('should correctly map users uid to their rank', () => {
    const leaderBoardUsers = [
      {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'John',
        stars: 20,
        subscribed: true,
        uid: 'abcd1',
        rank: 2,
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Jane',
        stars: 30,
        subscribed: false,
        uid: 'abcd2',
        rank: 1,
      },
    ];
    const result = generateUidToRankMap(leaderBoardUsers);
    expect(result).toEqual({ abcd1: 2, abcd2: 1 });
  });
});

describe('getUserIndexByName', () => {
  it('should return -1 if leaderBoardUsers array is empty', () => {
    const leaderBoardUsers: LeaderBoardUser[] = [];
    const searchText = 'John';
    const result = getUserIndexByName(leaderBoardUsers, searchText);
    expect(result).toBe(-1);
  });

  it('should return -1 if no user matches the searchText', () => {
    const leaderBoardUsers = [
      {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'Mark Wong',
        stars: 20,
        subscribed: true,
        uid: '1',
        rank: 2,
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Victoria Vang',
        stars: 30,
        subscribed: false,
        uid: '2',
        rank: 1,
      },
    ];
    const searchText = 'Tor';
    const result = getUserIndexByName(leaderBoardUsers, searchText);
    expect(result).toBe(-1);
  });

  it('should return the index of the user that matches the searchText', () => {
    const leaderBoardUsers = [
      {
        bananas: 10,
        lastDayPlayed: '2023-10-28',
        longestStreak: 5,
        name: 'Mark Wong',
        stars: 20,
        subscribed: true,
        uid: '1',
        rank: 2,
      },
      {
        bananas: 15,
        lastDayPlayed: '2023-10-27',
        longestStreak: 7,
        name: 'Victoria Vang',
        stars: 30,
        subscribed: false,
        uid: '2',
        rank: 1,
      },
    ];
    const searchText = 'vang';
    const result = getUserIndexByName(leaderBoardUsers, searchText);
    expect(result).toBe(1);
  });
});
