// src/data/songs.js
// Coloque seus arquivos de áudio na pasta assets/songs/
// e suas capas na pasta assets/covers/

const songs = [
  {
    id: '1',
    title: 'Música 01',
    artist: 'Artista 01',
    duration: 210, // duração em segundos (3:30)
    audio: require('../../assets/songs/song1.mp3'),
    cover: require('../../assets/covers/cover1.png'),
    color: '#1a3a5c', // cor dominante para o fundo dinâmico
  },
  {
    id: '2',
    title: 'Música 02',
    artist: 'Artista 02',
    duration: 195,
    audio: require('../../assets/songs/song2.mp3'),
    cover: require('../../assets/covers/cover2.png'),
    color: '#3a1a2e',
  },
  {
    id: '3',
    title: 'Música 03',
    artist: 'Artista 03',
    duration: 240,
    audio: require('../../assets/songs/song3.mp3'),
    cover: require('../../assets/covers/cover3.png'),
    color: '#1a3a2a',
  },
  {
    id: '4',
    title: 'Música 04',
    artist: 'Artista 04',
    duration: 180,
    audio: require('../../assets/songs/song4.mp3'),
    cover: require('../../assets/covers/cover4.png'),
    color: '#3a2e1a',
  },
  {
    id: '5',
    title: 'Música 05',
    artist: 'Artista 05',
    duration: 225,
    audio: require('../../assets/songs/song5.mp3'),
    cover: require('../../assets/covers/cover5.png'),
    color: '#2a1a3a',
  },
];

export default songs;
