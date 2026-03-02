// src/screens/NowPlayingScreen.js
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePlayer } from '../context/PlayerContext';

const { width } = Dimensions.get('window');
const COVER_SIZE = width * 0.78;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function NowPlayingScreen({ navigation }) {
  const {
    currentSong,
    isPlaying,
    progress,
    currentTime,
    isShuffle,
    isRepeat,
    togglePlayPause,
    handleNext,
    handlePrev,
    setIsShuffle,
    setIsRepeat,
  } = usePlayer();

  // Animação da capa
  const coverScale = useRef(new Animated.Value(isPlaying ? 1 : 0.85)).current;

  useEffect(() => {
    Animated.spring(coverScale, {
      toValue: isPlaying ? 1 : 0.85,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [isPlaying]);

  const totalDuration = currentSong?.duration || 1;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[currentSong?.color || '#1a3a1a', '#121212']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.65 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="chevron-down" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerLabel}>TOCANDO AGORA</Text>
          </View>

          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Capa do álbum (placeholder cinza com animação) */}
        <View style={styles.coverContainer}>
  <Animated.Image
    source={currentSong?.cover}
    style={[
      styles.coverImage,
      { transform: [{ scale: coverScale }] },
    ]}
    resizeMode="cover"
  />
</View>

        {/* Informações da música */}
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {currentSong?.title}
            </Text>
            <Text style={styles.songArtist} numberOfLines={1}>
              {currentSong?.artist}
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="checkmark-circle" size={26} color="#1DB954" />
          </TouchableOpacity>
        </View>

        {/* Barra de progresso */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.min(progress * 100, 100)}%` },
              ]}
            />
            <View
              style={[
                styles.progressThumb,
                { left: `${Math.min(progress * 100, 100)}%` },
              ]}
            />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
          </View>
        </View>

        {/* Controles principais */}
        <View style={styles.controls}>
          {/* Shuffle */}
          <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
            <Ionicons
              name="shuffle"
              size={26}
              color={isShuffle ? '#1DB954' : '#b3b3b3'}
            />
          </TouchableOpacity>

          {/* Anterior */}
          <TouchableOpacity onPress={handlePrev}>
            <Ionicons name="play-skip-back" size={38} color="#fff" />
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={36}
              color="#000"
              style={{ marginLeft: isPlaying ? 0 : 3 }}
            />
          </TouchableOpacity>

          {/* Próxima */}
          <TouchableOpacity onPress={handleNext}>
            <Ionicons name="play-skip-forward" size={38} color="#fff" />
          </TouchableOpacity>

          {/* Repeat */}
          <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
            <Ionicons
              name="repeat"
              size={26}
              color={isRepeat ? '#1DB954' : '#b3b3b3'}
            />
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Ionicons name="laptop-outline" size={22} color="#b3b3b3" />
          </TouchableOpacity> <TouchableOpacity>
            <Ionicons name="list-outline" size={22} color="#b3b3b3" />
          </TouchableOpacity>
        </View>

        {/* Letras */}
        <TouchableOpacity style={styles.lyricsButton}>
          <Text style={styles.lyricsText}>Letras</Text>
        </TouchableOpacity>

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#121212',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginBottom: 16,
  },
  headerBtn: {
    padding: 4,
    width: 36,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  coverContainer: {
    flex: 1,            // <--- Adicione isso
    alignItems: 'center',
    justifyContent: 'center', // <--- Adicione isso para centralizar verticalmente
    marginBottom: 28,
  },
  coverImage: {
  width: COVER_SIZE,
  height: COVER_SIZE,
  borderRadius: 6,
  elevation: 14,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
},
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    marginRight: 12,
  },
  songTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 15,
    marginTop: 4,
  },
  progressWrapper: {
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginLeft: -7,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  playButton: {
    backgroundColor: '#fff',
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  footerDevice: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  lyricsButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#282828',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  lyricsText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
