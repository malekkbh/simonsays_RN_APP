import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {useState} from 'react';
import sizes from '../../res/sizes';
import strings from '../../res/strings';
import {PopupProps} from './Popup.types';
import Button from '../Button/Button';
import {ScoreModel} from '../../res/models/score.typs';

const Popup = (props: PopupProps) => {
  const {score, modaleVisible, onSubmitScore} = props;
  const [name, setName] = useState<string>('');

  const inputParams: TextInputProps = {
    value: name,
    onChangeText: setName,
    style: styles.input,
    placeholder: strings.name,
    placeholderTextColor: 'gray',
  };

  const onSubmitScorePress = () => {
    if (name.length < 2) {
      Alert.alert('Please enter your name');
      return;
    }

    const scoreObj: ScoreModel = {
      name,
      score,
    };

    onSubmitScore?.(scoreObj);
  };

  return (
    <Modal visible={modaleVisible} transparent>
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>{strings.gameOver}</Text>
          <Text style={styles.score}>{strings.score + (score || 0)}</Text>
          <TextInput {...inputParams} />
          <Button title={strings.submit} onPress={onSubmitScorePress} />
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: sizes.PageWidth - 80,
    backgroundColor: '#ffff',
    borderRadius: 20,
    paddingBottom: 35,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
    color: 'red',
  },
  score: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    alignSelf: 'center',
    width: '85%',
    marginTop: 25,
    borderRadius: 15,
    height: 40,
    color: 'black',
    paddingHorizontal: 10,
  },
});
