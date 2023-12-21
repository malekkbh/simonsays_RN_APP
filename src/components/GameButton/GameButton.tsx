import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GameButtonProps} from './GameButton.types';
import sizes from '../../res/sizes';

const GameButton = (props: GameButtonProps) => {
  const {color, onPress, isActive} = props;

  const btnStyle = [
    styles.container,
    {backgroundColor: color},
    isActive && {opacity: 0.4},
  ];

  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}></TouchableOpacity>
  );
};

export default GameButton;

const styles = StyleSheet.create({
  container: {
    height: sizes.PageHieght * 0.5,
    width: sizes.PageWidth * 0.5,
    borderWidth: 8,
  },
});
