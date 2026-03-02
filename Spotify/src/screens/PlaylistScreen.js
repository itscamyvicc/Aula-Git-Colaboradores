// src/screens/PlaylistScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';
import SongItem from '../components/SongItem';
import MiniPlayer from '../components/MiniPlayer';

// Imagem de capa da playlist (placeholder)
const PLAYLIST_COVER = require('../../assets/covers/playlist_cover.png');

export default function PlaylistScreen({ navigation }) {
  const {
    songs,
    currentSong,
    currentSongIndex,
    isPlaying,
    togglePlayPause,
    playSong,
  } = usePlayer();

  function openNowPlaying() {
    navigation.navigate('NowPlaying');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={['#2a2a2a', '#121212']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
      >
        {/* Header - botão voltar */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={28} color="#fff" />
          </TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </View>

        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.playlistHeader}>
              {/* Capa da playlist */}
              <Image source={PLAYLIST_COVER} style={styles.playlistCover} />

              {/* Informações da playlist */}
              <Text style={styles.playlistTitle}>Minha Playlist</Text>

              <View style={styles.metaRow}>
                <Image source={PLAYLIST_COVER} style={styles.avatarSmall} />
                <Text style={styles.metaText}>Você • 2h 10min</Text>
              </View>

              {/* Botões de ação (não interativos) */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="arrow-down-circle-outline" size={26} color="#b3b3b3" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="person-add-outline" size={24} color="#b3b3b3" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="ellipsis-horizontal" size={24} color="#b3b3b3" />
                </TouchableOpacity>

                {/* Espaço flexível */}
                <View style={{ flex: 1 }} />

                {/* Botão shuffle */}
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="shuffle" size={26} color="#b3b3b3" />
                </TouchableOpacity>

                {/* Botão Play principal */}
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={togglePlayPause}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={28}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>

              {/* Opção de adicionar música (não interativa) */}
              <TouchableOpacity style={styles.addSongRow}>
                <View style={styles.addSongIcon}>
                  <Ionicons name="add" size={22} color="#fff" />
                </View>
                <Text style={styles.addSongText}>Adicionar música</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item, index }) => (
            <SongItem
              song={item}
              index={index}
              isActive={index === currentSongIndex}
              isPlaying={isPlaying}
              onPress={() => {
                playSong(index);
                navigation.navigate('NowPlaying');
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Mini Player */}
        <View style={styles.miniPlayerContainer}>
          <MiniPlayer onPress={openNowPlaying} />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  playlistHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  playlistCover: {
    width: 200,
    height: 200,
    borderRadius: 4,
    backgroundColor: '#333',
    marginVertical: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  avatarSmall: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#555',
    marginRight: 6,
  },
  metaText: {
    color: '#b3b3b3',
    fontSize: 13,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  actionButton: {
    marginRight: 16,
    padding: 4,
  },
  playButton: {
    backgroundColor: '#1DB954',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addSongRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  addSongIcon: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addSongText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  miniPlayerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
