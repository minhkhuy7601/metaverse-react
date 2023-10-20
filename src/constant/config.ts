import meeting from "@/assets/items/clock.png";
import mascot from "@/assets/items/mascot.png";
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
    type: "lobby",
    rows: 20,
    cols: 30,
    map: LOBBY_MAP,
    image: lobby,
    startPosition: { x: 12, y: 11 },
    actions: {
      "17,6": {
        id: "door_to_room1",
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
        label: "Room 1",
      },
      "13,6": {
        id: "door_to_room2",
        type: "CHANGE_ROOM",
        value: {
          name: "room2",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 2",
        styling: "scale-150",
      },
      "11,8": {
        id: "door_to_room3",
        type: "CHANGE_ROOM",
        value: {
          name: "room3",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 3",
        styling: "scale-150",
      },
      "10,10": {
        id: "door_to_room4",
        type: "CHANGE_ROOM",
        value: {
          name: "room4",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 4",
        styling: "scale-150",
      },
      "12,12": {
        id: "door_to_room5",
        type: "CHANGE_ROOM",
        value: {
          name: "room5",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 5",
        styling: "scale-150",
      },
      "17,12": {
        id: "door_to_room6",
        type: "CHANGE_ROOM",
        value: {
          name: "room6",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 6",
        styling: "scale-150",
      },
      "19,10": {
        id: "door_to_room7",
        type: "CHANGE_ROOM",
        value: {
          name: "room7",
          resetPosition: {
            x: 16,
            y: 6,
          },
        },
        image: teleport1,
        label: "Room 7",
        styling: "scale-150",
      },
      "15,9": {
        id: "door_to_room",
        tooltip: "Back to school",
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
    type: "school",
    rows: 20,
    cols: 30,
    map: SCHOOL_MAP,
    image: schoolMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "14,9": {
        id: "door_to_room",
        // tooltip: "Go to lobby",
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
      "13,8": {
        id: "popup",
        tooltip: "Welcome",
        type: "POP_UP_QUESTION",
        image: mascot,
      },
    },
  },
  room1: {
    id: "room1",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 17,
            y: 7,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
  room2: {
    id: "room2",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 13,
            y: 7,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
  room3: {
    id: "room3",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 12,
            y: 8,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
  room4: {
    id: "room4",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 11,
            y: 10,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
  room5: {
    id: "room5",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 13,
            y: 11,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
  room6: {
    id: "room6",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 16,
            y: 12,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
  room7: {
    id: "room7",
    type: "room",
    rows: 20,
    cols: 30,
    map: ROOM_MAP,
    image: roomMap,
    startPosition: { x: 12, y: 11 },
    actions: {
      "16,5": {
        id: "door_to_room",
        type: "CHANGE_ROOM",
        value: {
          name: "lobby",
          resetPosition: {
            x: 18,
            y: 9,
          },
        },
        image: teleport1,
        label: "Leave room",
        styling: "scale-150",
      },
      "15,10": {
        id: "join_meeting",
        type: "JOIN_MEETING",
        image: meeting,
        styling: "scale-150",
      },
    },
  },
};
