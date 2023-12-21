import {FlatList, FlatListProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {ScoreModel} from '../res/models/score.typs';
import ScoreItem from '../components/ScoreItem/ScoreItem';
import Button from '../components/Button/Button';
import strings from '../res/strings';

type Props = {};

const ScoresScreen = (props: Props) => {
  const {scores} = useSelector((state: RootState) => state.scores);

  console.log('scores: ', scores);

  const renderItem = ({item, index}) => {
    return <ScoreItem {...item} index={index + 1} />;
  };

  const sortAndSetScores = () => {
    var arr = [...scores];
    const sortedScores = arr.sort((a, b) => b.score - a.score);
    return sortedScores.slice(0, 10);
  };

  const flatlistParams: FlatListProps<ScoreModel> = {
    data: sortAndSetScores(),
    renderItem,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{strings.topScores}</Text>
      <FlatList {...flatlistParams} />
      <Button
        title={strings.playAgain}
        onPress={() => props.navigation.pop()}
      />
    </View>
  );
};

export default ScoresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 30,
  },
});
