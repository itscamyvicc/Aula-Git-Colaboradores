// src/context/PlayerContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import songs from '../data/songs';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);       // 0 a 1
  const [currentTime, setCurrentTime] = useState(0); // em segundos
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const soundRef = useRef(null);
  const currentSong = songs[currentSongIndex];

  // Configura o áudio para tocar em modo silencioso (iOS)
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Carrega e toca a música sempre que o índice muda
  useEffect(() => {
    loadAndPlay();
  }, [currentSongIndex]);

  async function loadAndPlay() {
    // Descarrega o som anterior se existir
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    setProgress(0);
    setCurrentTime(0);

    try {
      const { sound } = await Audio.Sound.createAsync(
        currentSong.audio,
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.log('Erro ao carregar áudio:', error);
    }
  }

  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      const pos = status.positionMillis / 1000;
      const dur = status.durationMillis / 1000 || currentSong.duration;
      setCurrentTime(pos);
      setProgress(dur > 0 ? pos / dur : 0);

      // Música terminou
      if (status.didJustFinish) {
        handleNext();
      }
    }
  }

  async function togglePlayPause() {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  }

  function handleNext() {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentSongIndex && songs.length > 1);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
  }

  function handlePrev() {
    // Se já passou mais de 3 segundos, reinicia a música atual
    if (currentTime > 3) {
      soundRef.current?.setPositionAsync(0);
      return;
    }
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }

  function playSong(index) {
    if (index === currentSongIndex) {
      togglePlayPause();
    } else {
      setCurrentSongIndex(index);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        songs,
        currentSong,
        currentSongIndex,
        isPlaying,
        progress,
        currentTime,
        isShuffle,
        isRepeat,
        togglePlayPause,
        handleNext,
        handlePrev,
        playSong,
        setIsShuffle,
        setIsRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
