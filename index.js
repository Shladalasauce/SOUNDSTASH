import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('./services/audio/playback-service').playbackService);
require('expo-router/entry');
