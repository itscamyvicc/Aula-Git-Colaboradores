// src/components/SongItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function SongItem({ song, index, isPlaying, isActive, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={song.cover} style={styles.cover} />

      <View style={styles.info}>
        <Text
          style={[styles.title, isActive && styles.titleActive]}
          numberOfLines={1}
        >
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
      </View>

      {/* Ícone de equalizador animado quando a música está tocando */}
      {isActive && isPlaying ? (
        <Ionicons name="volume-high" size={18} color="#1DB954" style={styles.icon} />
      ) : (
        <Text style={styles.duration}>{formatTime(song.duration)}</Text>
      )}

      <Ionicons name="ellipsis-horizontal" size={20} color="#b3b3b3" style={styles.more} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  titleActive: {
    color: '#1DB954',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 13,
    marginTop: 2,
  },
  duration: {
    color: '#b3b3b3',
    fontSize: 13,
    marginRight: 8,
  },
  icon: {
    marginRight: 8,
  },
  more: {
    padding: 4,
  },
});
