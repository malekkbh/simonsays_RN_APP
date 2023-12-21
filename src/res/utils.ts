import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScoreModel} from './models/score.typs';

export const getScoresFromStorage = async () => {
  return await AsyncStorage.getItem('SCORES')
    .then(res => res && JSON.parse(res))
    .then(resJson => resJson);
};

export const saveScoresToStorage = (items: ScoreModel[]) => {
  const itemsStr: string = JSON.stringify(items);
  AsyncStorage.setItem('SCORES', itemsStr);
};
