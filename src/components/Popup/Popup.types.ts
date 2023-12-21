import {ScoreModel} from '../../res/models/score.typs';

export type PopupProps = {
  score: number;
  modaleVisible: boolean;
  onSubmitScore: (score: ScoreModel) => void;
};
