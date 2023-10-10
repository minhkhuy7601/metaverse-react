import { createSlice } from "@reduxjs/toolkit";

export interface QuestionState {
	question: Array<string>;
	answer: Array<string>;
}

const initialState: QuestionState = {
	question: [],
	answer: [],
};

export const QASlice = createSlice({
	name: "question",
	initialState,
	reducers: {
		setQA: (state, { payload }) => {
			state.question = payload.question;
			state.answer = payload.answer;
		},
		resetQA: (state) => {
			state.question = [];
			state.answer = [];
		},
	},
});

export const { setQA, resetQA } = QASlice.actions;

export default QASlice.reducer;
