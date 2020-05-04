export interface Setup {
    numOfCards: number,
    numOfPlayers: {
      name: string
    }[]
    playerNames: {
      name: string,
      score: number
    }[];
    difficulty: string,
  }