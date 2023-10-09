import garden from "@/assets/maps/map2.jpg";
import lobbyImage from "@/assets/maps/metaverse_class.png";
import { ConfigMapType } from "@/types/map";
import { CLASS_MAP, GARDEN_MAP } from "./maps/class";

export const CELL_SIZE = 30;
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
      "10,19": {
        type: "CHANGE_ROOM",
        value: {
          name: "room",
          resetPosition: {
            x: 5,
            y: 10,
          },
        },
        image: "bg-sky-400/50",
      },
      "10,10": {
        type: "POP_UP_QUESTION",
        value: {
          question: "How __ you?",
          answer: "are",
        },
        image: "bg-green-400/50",
      },
    },
  },
  room: { id: "room", rows: 30, cols: 30, map: GARDEN_MAP, image: garden },
};
