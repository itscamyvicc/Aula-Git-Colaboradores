// App.js
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PlayerProvider } from './src/context/PlayerContext';
import PlaylistScreen from './src/screens/PlaylistScreen';
import NowPlayingScreen from './src/screens/NowPlayingScreen';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#121212' },
            // Animação de slide de baixo para cima (como o Spotify)
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        >
          <Stack.Screen name="Spotify" component={PlaylistScreen} />
          <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}