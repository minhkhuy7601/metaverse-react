import { createSlice } from "@reduxjs/toolkit";

export interface ActionState {
  activeAction: "CHAT_BOX" | "MEMBER" | null;
}

const initialState: ActionState = {
  activeAction: "CHAT_BOX",
};

export const actionState = createSlice({
  name: "action",
  initialState,
  reducers: {
    setActionToChatBox: (state) => {
      state.activeAction = "CHAT_BOX";
    },
    setActionToMember: (state) => {
      state.activeAction = "MEMBER";
    },
    clearActiveAction: (state) => {
      state.activeAction = null;
    },
  },
});

export const { setActionToChatBox, setActionToMember, clearActiveAction } =
  actionState.actions;

export default actionState.reducer;
