export interface Setup {
    numOfCards: number,
    numOfPlayers: {
      name: string
    }[]
    playerNames: string[];
    difficulty: string,
  }