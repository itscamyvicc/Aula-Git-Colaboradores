// src/screens/PlaylistScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';
import SongItem from '../components/SongItem';
import MiniPlayer from '../components/MiniPlayer';
import { Image } from 'react-native';

export default function PlaylistScreen({ navigation }) {
  const {
    songs,
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
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <LinearGradient
        colors={['#3d6b35', '#0d1f0d', '#0a0a0a']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
          ListHeaderComponent={
            <View style={styles.playlistHeader}>

              {/* Capa da Playlist */}
              <View style={styles.playlistCover}>
                <Ionicons name="musical-notes" size={64} color="#b3b3b3" />
              </View>

              {/* Título */}
              <Text style={styles.playlistTitle}> Minha Playlist </Text>

              {/* Meta info */}
              <View style={styles.metaRow}>
                <View style={styles.avatarSmall} />
                <Text style={styles.metaText}> Silvano Careca </Text>
              </View>

              <View style={styles.metaRow2}>
                <Ionicons name="globe-outline" size={14} color="#b3b3b3" />
                <Text style={styles.metaText2}> 12 curtidas • 20 minutos </Text>
              </View>

              {/* Botões de ação */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="arrow-down-circle-outline" size={28} color="#b3b3b3" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="person-add-outline" size={26} color="#b3b3b3" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="ellipsis-horizontal" size={26} color="#b3b3b3" />
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="shuffle" size={28} color="#b3b3b3" />
                </TouchableOpacity>

                {/* Botão Play */}
                <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={28}
                    color="#000"
                    style={{ marginLeft: isPlaying ? 0 : 3 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Adicionar música */}
              <TouchableOpacity style={styles.addSongRow}>
                <View style={styles.addSongIcon}>
                  <Ionicons name="add" size={24} color="#fff" />
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
        />

        {/* Mini Player + Navbar */}
        <View style={styles.bottomContainer}>
          <MiniPlayer onPress={openNowPlaying} />

          {/* Navbar inferior */}
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="home" size={24} color="#fff" />
              <Text style={styles.navText}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="search" size={24} color="#b3b3b3" />
              <Text style={[styles.navText, { color: '#b3b3b3' }]}>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="library" size={24} color="#b3b3b3" />
              <Text style={[styles.navText, { color: '#b3b3b3' }]}>Biblioteca</Text>
            </TouchableOpacity>
          </View>
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
    width: 190,
    height: 190,
    borderRadius: 6,
    backgroundColor: '#333',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  avatarSmall: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#555',
    marginRight: 6,
  },
  metaText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  metaRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  metaText2: {
    color: '#b3b3b3',
    fontSize: 13,
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  actionButton: {
    marginRight: 18,
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
    paddingVertical: 4,
  },
  addSongIcon: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  addSongText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121212',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
