import teleport from "@/assets/items/teleport.gif";
import teleport1 from "@/assets/items/teleport1.gif";
import lobby from "@/assets/maps/lobby.jpg";
import roomMap from "@/assets/maps/roomMap.png";
import schoolMap from "@/assets/maps/schoolMap.jpg";
import { ConfigMapType } from "@/types/map";
import { LOBBY_MAP, ROOM_MAP, SCHOOL_MAP } from "./maps/class";

export const CELL_SIZE = 32;
export const ROWS = 20;
export const COLS = 30;

export const CONFIG_MAP: ConfigMapType = {
  lobby: {
    id: "lobby",
    rows: 20,
    cols: 30,
    map: LOBBY_MAP,
    image: lobby,
    startPosition: { x: 12, y: 11 },
    meetingUrl:
      "https://meetings.vonage.com/?room_token=639474131&participant_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkyOThlNzZlLTNkMDQtNDM0MS05MDIyLTQ2MTY2MmFiNmU0OCJ9.eyJwYXJ0aWNpcGFudElkIjoiMGQyNGJmMTktZWM4Yi00NTE0LTk4YWQtMjI2OWJjNDZiODQ2IiwiaWF0IjoxNjk2OTMwNzkwfQ.Hme_VY6uLD409ULKyz4jKbt2jE3hDildlfrcO44dNOc",
    actions: {
      "17,6": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "room1",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        styling: "scale-150",
        label: "Room 2",
      },
      "13,6": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "room2",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 1",
        styling: "scale-150",
      },
      "15,9": {
        id: "door_to_room",
        tooltip: "Classroom",
        type: "CHANGE_ROOM",
        value: {
          name: "school",
          resetPosition: {
            x: 13,
            y: 10,
          },
        },
        image: teleport,
      },
    },
  },
  school: {
    id: "school",
    rows: 20,
    cols: 30,
    map: SCHOOL_MAP,
    image: schoolMap,
    startPosition: { x: 12, y: 11 },
    meetingUrl:
      "https://meetings.vonage.com/?room_token=639474131&participant_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkyOThlNzZlLTNkMDQtNDM0MS05MDIyLTQ2MTY2MmFiNmU0OCJ9.eyJwYXJ0aWNpcGFudElkIjoiMGQyNGJmMTktZWM4Yi00NTE0LTk4YWQtMjI2OWJjNDZiODQ2IiwiaWF0IjoxNjk2OTMwNzkwfQ.Hme_VY6uLD409ULKyz4jKbt2jE3hDildlfrcO44dNOc",
    actions: {
      "14,9": {
        id: "door_to_room",
        tooltip: "Go to lobby",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 15,
            y: 10,
          },
        },
        image: teleport,
      },
    },
  },
  room1: {
    id: "room1",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    meetingUrl:
      "https://meetings.vonage.com/?room_token=751600723&participant_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkyOThlNzZlLTNkMDQtNDM0MS05MDIyLTQ2MTY2MmFiNmU0OCJ9.eyJwYXJ0aWNpcGFudElkIjoiNGU1YjljYjQtZTk5YS00YjhkLWEyY2ItNWE3NDE0MGZhYmQxIiwiaWF0IjoxNjk2OTI4NDU4fQ.UkhHO79QKZdl8MqcQlFA9DNWf638kddbHPICnVpwQFc",
    actions: {
      "16,5": {
        id: "door_to_room",
        tooltip: "Lobby room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 17,
            y: 7,
          },
        },
        image: teleport1,
      },
    },
  },
  room2: {
    id: "room2",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    meetingUrl:
      "https://meetings.vonage.com/?room_token=751600723&participant_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkyOThlNzZlLTNkMDQtNDM0MS05MDIyLTQ2MTY2MmFiNmU0OCJ9.eyJwYXJ0aWNpcGFudElkIjoiNGU1YjljYjQtZTk5YS00YjhkLWEyY2ItNWE3NDE0MGZhYmQxIiwiaWF0IjoxNjk2OTI4NDU4fQ.UkhHO79QKZdl8MqcQlFA9DNWf638kddbHPICnVpwQFc",
    actions: {
      "16,5": {
        id: "door_to_room",
        tooltip: "Lobby room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 13,
            y: 7,
          },
        },
        image: teleport1,
      },
    },
  },
};
