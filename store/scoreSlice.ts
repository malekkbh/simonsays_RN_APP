import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ScoreModel} from '../src/res/models/score.typs';
import {saveScoresToStorage} from '../src/res/utils';

type ScoreStateProps = {
  scores: ScoreModel[];
};

const initialState: ScoreStateProps = {
  scores: [],
};

export const ScoreSlice = createSlice({
  name: 'scoreList',
  initialState,
  reducers: {
    addScore: (state: ScoreStateProps, action: PayloadAction<ScoreModel>) => {
      state.scores.push(action.payload);
      saveScoresToStorage(state.scores);
    },
    setAllScores: (
      state: ScoreStateProps,
      action: PayloadAction<ScoreModel[]>,
    ) => {
      state.scores = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addScore, setAllScores} = ScoreSlice.actions;

export default ScoreSlice.reducer;
