// src/components/MiniPlayer.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';

export default function MiniPlayer({ onPress }) {
  const { currentSong, isPlaying, togglePlayPause, handleNext, progress } = usePlayer();

  if (!currentSong) return null;

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      {/* Barra de progresso fina no topo */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.container}>
        <Image source={currentSong.cover} style={styles.cover} />

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>

        {/* Botão de play/pause */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          style={styles.button}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Botão próxima */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          style={styles.button}
        >
          <Ionicons name="play-skip-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#282828',
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 8,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 2,
    backgroundColor: '#555',
  },
  progressBarFill: {
    height: 2,
    backgroundColor: '#1DB954',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cover: {
    width: 44,
    height: 44,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    marginRight: 6,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    padding: 6,
    marginLeft: 4,
  },
});
