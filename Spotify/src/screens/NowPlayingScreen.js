// src/screens/NowPlayingScreen.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

  // Animação da capa (cresce quando tocando)
  const coverScale = useRef(new Animated.Value(isPlaying ? 1 : 0.88)).current;

  useEffect(() => {
    Animated.spring(coverScale, {
      toValue: isPlaying ? 1 : 0.88,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [isPlaying]);

  const totalDuration = currentSong?.duration || 1;

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[currentSong?.color || '#1a1a2e', '#121212']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="chevron-down" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerLabel}>TOCANDO AGORA</Text>
            <Text style={styles.headerPlaylist}>Minha Playlist</Text>
          </View>

          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Capa do álbum com animação */}
        <View style={styles.coverContainer}>
          <Animated.View style={{ transform: [{ scale: coverScale }] }}>
            <Image source={currentSong?.cover} style={styles.cover} />
          </Animated.View>
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
            <Ionicons name="heart-outline" size={26} color="#b3b3b3" />
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
            {/* Bolinha na ponta */}
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

        {/* Controles */}
        <View style={styles.controls}>
          {/* Shuffle */}
          <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
            <Ionicons
              name="shuffle"
              size={24}
              color={isShuffle ? '#1DB954' : '#b3b3b3'}
            />
          </TouchableOpacity>

          {/* Anterior */}
          <TouchableOpacity onPress={handlePrev}>
            <Ionicons name="play-skip-back" size={36} color="#fff" />
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={34}
              color="#000"
            />
          </TouchableOpacity>

          {/* Próxima */}
          <TouchableOpacity onPress={handleNext}>
            <Ionicons name="play-skip-forward" size={36} color="#fff" />
          </TouchableOpacity>

          {/* Repeat */}
          <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
            <Ionicons
              name="repeat"
              size={24}
              color={isRepeat ? '#1DB954' : '#b3b3b3'}
            />
          </TouchableOpacity>
        </View>

        {/* Rodapé com opções extras */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Ionicons name="laptop-outline" size={22} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="list-outline" size={22} color="#b3b3b3" />
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
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
    color: '#b3b3b3',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  headerPlaylist: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: 6,
    backgroundColor: '#333',
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
    marginBottom: 24,
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
    marginBottom: 28,
  },
  playButton: {
    backgroundColor: '#fff',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});
