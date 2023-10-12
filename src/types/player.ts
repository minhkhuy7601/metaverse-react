import { MapType } from "./map";
import { MessageType } from "./message";

export interface PlayerType {
	id: string;
	name: string;
	direction?: string;
	avatar?: string;
	x: number;
	state?: number;
	y: number;
	roomId: string;
}

export interface GamePlayContextProps {
	playerId: string | null;
	setCurrentPlayer: React.Dispatch<React.SetStateAction<PlayerType>>;
	messages: Record<string, MessageType>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	playerRef: any; // Type accordingly to your Firebase database reference
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	players: any;
	currentRoom: MapType;
	currentPlayer: PlayerType;
}
