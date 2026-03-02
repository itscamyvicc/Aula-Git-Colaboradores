import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SongItem({ song, index, isPlaying }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: song.cover }} style={styles.cover} />
      
      <View style={styles.info}>
        <Text style={[styles.title, isPlaying && styles.titleActive]} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
      </View>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="ellipsis-horizontal" size={20} color="#b3b3b3" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  titleActive: {
    color: '#1db954',
  },
  artist: {
    fontSize: 12,
    color: '#b3b3b3',
  },
  menuButton: {
    padding: 8,
  },
});
