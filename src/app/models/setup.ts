import { User } from 'src/app/models/user';

export interface Setup {
  numOfCards: number;
  players: User[];
  difficulty: string;
}

// firebaseObject: {
//   displayName: string;
//   email: string;
//   gamesLost: number;
//   gamesPlayed: number;
//   gamesWon: number;
//   photoURL: string;
//   playersBeat: [];
//   playersLost: [];
//   uid: string;
// }[];