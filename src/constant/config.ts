import clock from "@/assets/maps/clock.png";
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
    meetingUrl:
      "https://meetings.vonage.com/?room_token=639474131&participant_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkyOThlNzZlLTNkMDQtNDM0MS05MDIyLTQ2MTY2MmFiNmU0OCJ9.eyJwYXJ0aWNpcGFudElkIjoiMGQyNGJmMTktZWM4Yi00NTE0LTk4YWQtMjI2OWJjNDZiODQ2IiwiaWF0IjoxNjk2OTMwNzkwfQ.Hme_VY6uLD409ULKyz4jKbt2jE3hDildlfrcO44dNOc",
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
      "15,10": {
        id: "meeting",
        type: "MEETING",
        image: clock,
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
    meetingUrl:
      "https://meetings.vonage.com/?room_token=751600723&participant_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkyOThlNzZlLTNkMDQtNDM0MS05MDIyLTQ2MTY2MmFiNmU0OCJ9.eyJwYXJ0aWNpcGFudElkIjoiNGU1YjljYjQtZTk5YS00YjhkLWEyY2ItNWE3NDE0MGZhYmQxIiwiaWF0IjoxNjk2OTI4NDU4fQ.UkhHO79QKZdl8MqcQlFA9DNWf638kddbHPICnVpwQFc",
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
