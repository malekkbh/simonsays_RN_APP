import {FlatList, FlatListProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScoreItemProps} from './ScoreItem.types';

const ScoreItem = (props: ScoreItemProps) => {
  const {name, score, index} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{index + '.'}</Text>
      <Text style={styles.txt}>{name}</Text>
      <Text style={styles.txt}>{score}</Text>
    </View>
  );
};

export default ScoreItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ffff',
  },
  txt: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
