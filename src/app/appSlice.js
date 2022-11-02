import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import processData from "./processData";

const initialState = {
  data: null,
  status: "idle",
  error: null,
  score: 0,
  checkAnswers: false,
  intPlayAgain: 0,
};

export const fetchData = createAsyncThunk("app/fetchData", async (url) => {
  try {
    const response = await fetch(url);
    const quizData = await response.json();
    const newData = await processData(quizData);
    return newData;
  } catch (e) {
    console.error(e);
  }
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increaseScore: (state) => {
      state.score += 1;
    },
    checkAnswers: (state) => {
      state.checkAnswers = true;
    },
    playAgain: (state) => {
      state.intPlayAgain += 1;
    },
    reset: (state) => {
      return { ...initialState, intPlayAgain: state.intPlayAgain };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { increaseScore, checkAnswers, playAgain, reset } =
  appSlice.actions;

export const selectData = (state) => state.app.data;
export const selectCheck = (state) => state.app.checkAnswers;
export const selectPlayAgain = (state) => state.app.intPlayAgain;

export default appSlice.reducer;
