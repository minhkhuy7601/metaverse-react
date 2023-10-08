export interface PlayerType {
  id: string;
  name: string;
  direction: string;
  color: string;
  x: number;
  state: number;
  y: number;
}

export interface GamePlayContextProps {
  playerId: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  playerRef: any; // Type accordingly to your Firebase database reference
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  players: any;
}
