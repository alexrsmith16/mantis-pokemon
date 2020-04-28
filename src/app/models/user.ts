export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    playersLost: [];
    playersBeat: [];
  }