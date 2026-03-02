// src/context/PlayerContext.js

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import songs from '../data/songs';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const soundRef = useRef(null);
  const currentSong = songs[currentSongIndex];

  // Atualiza progresso automaticamente
  useEffect(() => {
    if (!soundRef.current) return;

    const interval = setInterval(async () => {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000);
        setProgress(
          status.durationMillis
            ? status.positionMillis / status.durationMillis
            : 0
        );
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Carrega nova música quando índice muda
  useEffect(() => {
    loadAndPlay();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentSongIndex]);

  async function loadAndPlay() {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        currentSong.audio,
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.log('Erro ao carregar áudio:', error);
      setIsPlaying(false);
    }
  }

  async function togglePlayPause() {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
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
    setCurrentSongIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
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