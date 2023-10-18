import { createSlice } from "@reduxjs/toolkit";

export interface ActionState {
  activeAction: "CHAT_BOX" | "MEMBER" | null;
  isShowAdjustingAvatarModal: boolean;
  isShowEditNameModal: boolean;
  isShowQuestionModal: boolean;
}

const initialState: ActionState = {
  activeAction: "MEMBER",
  isShowAdjustingAvatarModal: false,
  isShowEditNameModal: false,
  isShowQuestionModal: false,
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
    setShowAdjustingAvatarModal: (state, { payload }) => {
      state.isShowAdjustingAvatarModal = payload;
    },
    setShowEditNameModal: (state, { payload }) => {
      state.isShowEditNameModal = payload;
    },
    setShowQuestionModal: (state, { payload }) => {
      state.isShowQuestionModal = payload;
    },
  },
});

export const {
  setActionToChatBox,
  setActionToMember,
  clearActiveAction,
  setShowAdjustingAvatarModal,
  setShowEditNameModal,
  setShowQuestionModal,
} = actionState.actions;

export default actionState.reducer;
