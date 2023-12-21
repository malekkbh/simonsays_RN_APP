import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ButtonProps} from './Button.types';

const Button = (props: ButtonProps) => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: '85%',
    height: 40,
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#477C74',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
});
