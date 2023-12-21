import React, {useEffect, useState} from 'react';
import {
  Alert,
  EmitterSubscription,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import {useDispatch} from 'react-redux';
import ScreenNames from '../../routes/screenNames';
import {addScore, setAllScores} from '../../store/scoreSlice';
import GameButton from '../components/GameButton/GameButton';
import Popup from '../components/Popup/Popup';
import {ScoreModel} from '../res/models/score.typs';
import sizes from '../res/sizes';
import strings from '../res/strings';
import {getScoresFromStorage} from '../res/utils';

type Props = {};

var player: 'game' | 'user' | '' = '';
var level: number = 1;
var game: string[] = [];
var tuneIndex: number = 0;

const GameScreen = (props: Props) => {
  const gameButtons: string[] = ['green', 'red', 'yellow', 'blue'];

  const dispatch = useDispatch();

  const [activeColor, setActiveColor] = useState<String>('');
  const [modaleVisible, setmModaleVisible] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const nextLevel = (): void => {
    setScore(score + 1);

    setTimeout(() => {
      level++;
      tuneIndex = 0;
      player = 'game';
      start();
    }, 1.2 * 1000);
  };

  const onSuccessPress = (btnColor: string): void => {
    tuneIndex++;
    playSound(btnColor);

    if (tuneIndex === game.length) {
      nextLevel();
    }
  };

  const onFailPress = (): void => {
    playSound('error');
    setmModaleVisible(true);
  };

  const onBtnPress = (btnColor: string): void => {
    if (player === 'game' || player === '') {
      // the game did not start yet .
      playSound(btnColor);
      return;
    }

    if (game[tuneIndex] == btnColor) {
      onSuccessPress(btnColor);
    } else {
      onFailPress();
    }
  };

  const generateRandomNumber = (): number => {
    const min: number = 0;
    const max: number = 4;
    return parseInt(Math.random() * (max - min) + min);
  };

  const generateGame = (): string[] => {
    const gameArr: string[] = [];
    for (var i: number = 0; i < level; i++) {
      const colorIndex = generateRandomNumber();
      gameArr.push(gameButtons[colorIndex]);
    }

    return gameArr;
  };

  const playSound = (color: string): void => {
    setActiveColor(color);
    SoundPlayer.playSoundFile(color, 'wav');
  };

  const renderGameButtons = (): JSX.Element[] => {
    return gameButtons.map((btn: String) => {
      return (
        <GameButton
          color={btn}
          onPress={() => onBtnPress(btn)}
          isActive={activeColor == btn}
          key={btn + 'btn'}
        />
      );
    });
  };

  const resetGameParams = (): void => {
    level = 1;
    tuneIndex = 0;
    player = '';
    setScore(0);
  };

  const onStartBtnPress = () => {
    if (player === 'user') {
      Alert.alert(strings.resetGame, strings.confarmeResetGame, [
        {text: strings.ok, onPress: resetGame},
        {
          text: strings.cancel,
        },
      ]);
    } else {
      resetGame();
    }
  };

  const resetGame = (): void => {
    resetGameParams();
    player = 'game';
    start();
  };

  const start = (): void => {
    game = generateGame();
    playSound(game[0]);
    tuneIndex++;
  };

  const onSubmitScore = (userScore: ScoreModel): void => {
    dispatch(addScore(userScore));
    props.navigation.navigate(ScreenNames.scoreScreen);
    resetGameParams();
    setmModaleVisible(false);
  };

  const playSingleGameSounds = (): void => {
    if (player == 'game') {
      if (tuneIndex === game.length) {
        tuneIndex = 0;
        player = 'user';
        return;
      } else {
        setTimeout(() => {
          playSound(game[tuneIndex]);
          tuneIndex++;
        }, 200);
      }
    }
  };

  const initEventListeners = (): EmitterSubscription => {
    return SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {
      setActiveColor('');
      playSingleGameSounds();
    });
  };

  const getScores = () => {
    getScoresFromStorage().then((scores: ScoreModel[]) =>
      dispatch(setAllScores(scores || [])),
    );
  };

  useEffect(() => {
    getScores();
    const _onFinishedPlayingSubscription = initEventListeners();

    return () => {
      _onFinishedPlayingSubscription.remove();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Popup
        modaleVisible={modaleVisible}
        score={score}
        onSubmitScore={onSubmitScore}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.centerView}
          activeOpacity={0.9}
          onPress={onStartBtnPress}>
          <View style={styles.startContainer}>
            <Text style={styles.start}>{strings.start}</Text>
            <Text style={styles.score}>{strings.score_now + score}</Text>
          </View>
        </TouchableOpacity>
        {renderGameButtons()}
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  centerView: {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 9999999,
    height: sizes.PageWidth * 0.7,
    width: sizes.PageWidth * 0.7,
    top: sizes.PageHieght * 0.35,
    left: sizes.PageWidth * 0.15,
    borderRadius: 190,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffff',
  },
  start: {
    color: '#ffff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  score: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  startContainer: {
    width: '90%',
    height: '90%',
    borderRadius: 190,
    borderWidth: 7,
    borderColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
