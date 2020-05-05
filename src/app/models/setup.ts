export interface Setup {
  firebaseObject: {
    displayName: string;
    email: string;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    photoURL: string;
    playersBeat: [];
    playersLost: [];
    uid: string;
  }[];
  numOfCards: number;
  numOfPlayers: {
    name: string;
  }[];
  playerNames: {
    name: string;
    score: number;
  }[];
  difficulty: string;
}
