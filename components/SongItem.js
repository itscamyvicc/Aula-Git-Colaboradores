import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SongItem from '../components/SongItem';
import PlayButton from '../components/PlayButton';

export default function AlbumScreen() {
  const [isShuffled, setIsShuffled] = useState(false);

  const songs = [
    {
      id: 1,
      title: 'Sale o caramelle (Versione Plume)',
      artist: 'Palomo',
      cover: 'https://via.placeholder.com/50/90EE90/ffffff?text=S',
    },
    {
      id: 2,
      title: 'Cade',
      artist: 'Rangleklods',
      cover: 'https://via.placeholder.com/50/808080/ffffff?text=C',
    },
    {
      id: 3,
      title: 'Roll On',
      artist: 'Ryan Vanden McQuillen',
      cover: 'https://via.placeholder.com/50/808080/ffffff?text=R',
    },
    {
      id: 4,
      title: 'Strollin',
      artist: 'Artist Name',
      cover: 'https://via.placeholder.com/50/808080/ffffff?text=S',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300/7CB342/ffffff?text=URLAUB+2025' }}
            style={styles.albumCover}
          />
          
          <Text style={styles.albumTitle}>Urlaub 2025</Text>
          <Text style={styles.artistName}>Balu</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="heart-outline" size={16} color="#b3b3b3" />
            <Text style={styles.infoText}>12 guardado por • 2h 28m</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="download-outline" size={28} color="#b3b3b3" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setIsShuffled(!isShuffled)}
            >
              <Ionicons 
                name="shuffle" 
                size={28} 
                color={isShuffled ? "#1db954" : "#b3b3b3"} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={28} color="#b3b3b3" />
            </TouchableOpacity>
          </View>
          
          <PlayButton />
        </View>

        <TouchableOpacity style={styles.addSongButton}>
          <Ionicons name="add" size={24} color="#b3b3b3" />
          <Text style={styles.addSongText}>Song hinzufügen</Text>
        </TouchableOpacity>

        <View style={styles.songsList}>
          {songs.map((song, index) => (
            <SongItem 
              key={song.id} 
              song={song} 
              index={index}
              isPlaying={index === 0}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#b3b3b3" />
          <Text style={styles.navText}>Start</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#b3b3b3" />
          <Text style={styles.navText}>Suche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="library" size={24} color="#ffffff" />
          <Text style={[styles.navText, styles.navTextActive]}>Bibliothek</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 4,
    marginBottom: 20,
  },
  albumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 14,
    color: '#b3b3b3',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#b3b3b3',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  iconButton: {
    padding: 8,
  },
  addSongButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  addSongText: {
    color: '#b3b3b3',
    fontSize: 16,
    marginLeft: 12,
  },
  songsList: {
    paddingBottom: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#181818',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    color: '#b3b3b3',
  },
  navTextActive: {
    color: '#ffffff',
  },
});

