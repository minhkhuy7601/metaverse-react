import dino from "@/assets/maps/dino.png";
import hole from "@/assets/maps/hole.png";
import garden from "@/assets/maps/map2.jpg";
import lobbyImage from "@/assets/maps/metaverse_class.png";
import { ConfigMapType } from "@/types/map";
import { CLASS_MAP, GARDEN_MAP } from "./maps/class";

export const CELL_SIZE = 32;
export const ROWS = 20;
export const COLS = 30;

export const CONFIG_MAP: ConfigMapType = {
	lobby: {
		id: "lobby",
		rows: 20,
		cols: 30,
		map: CLASS_MAP,
		image: lobbyImage,
		actions: {
			"19,10": {
				id: "door_to_room",
				type: "CHANGE_ROOM",
				value: {
					name: "room",
					resetPosition: {
						x: 5,
						y: 11,
					},
				},
				image: hole,
			},
			"10,10": {
				id: "question",
				type: "POP_UP_QUESTION",
				value: {
					question: ["How", "you?"],
					answer: ["are"],
				},
				image: dino,
			},
		},
	},
	room: {
		id: "room",
		rows: 20,
		cols: 30,
		map: GARDEN_MAP,
		image: garden,
		actions: {
			"5,10": {
				id: "door_to_room",
				type: "CHANGE_ROOM",
				value: {
					name: "lobby",
					resetPosition: {
						x: 20,
						y: 10,
					},
				},
				image: hole,
			},
		},
	},
};
