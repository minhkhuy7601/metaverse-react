import { CONFIG_MAP } from "@/constant/config";
import { MapType } from "@/types/map";
import { MessageType } from "@/types/message";
import { PlayerType } from "@/types/player";
import { createSlice } from "@reduxjs/toolkit";

export interface GamePlayState {
  playersList: Record<string, PlayerType> | null;
  messagesList: Record<string, MessageType> | null;
  currentRoom: MapType;
  isLoading: boolean;
}

const initialState: GamePlayState = {
  playersList: null,
  messagesList: null,
  currentRoom: CONFIG_MAP["lobby"],
  isLoading: false,
};

export const gamePlaySlice = createSlice({
  name: "game-play",
  initialState,
  reducers: {
    setPlayersList: (state, { payload }) => {
      state.playersList = payload;
    },
    setMessagesList: (state, { payload }) => {
      state.messagesList = payload;
    },
    setCurrentRoom: (state, { payload }) => {
      state.currentRoom = payload;
    },
  },
});

export const { setPlayersList, setMessagesList, setCurrentRoom } =
  gamePlaySlice.actions;

export default gamePlaySlice.reducer;
