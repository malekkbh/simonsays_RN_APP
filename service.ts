import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async () => {
  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
  // TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, event => {
  //   console.log('Event.PlaybackActiveTrackChanged', event);
  // });

  // TrackPlayer.addEventListener(Event.PlaybackState, event => {
  //   console.log('Event.PlaybackState', event);
  // });
};
