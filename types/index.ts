export type User = {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
};

export type LeaderBoardUser = User & {
  rank: number;
  isSearchedUser?: boolean;
};

export type LeaderBoard = Record<string, User>;
