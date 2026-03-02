import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlayButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.playButton}
      onPress={() => setIsPlaying(!isPlaying)}
    >
      <Ionicons 
        name={isPlaying ? "pause" : "play"} 
        size={28} 
        color="#000000" 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
