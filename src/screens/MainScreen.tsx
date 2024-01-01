import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import MapView from 'react-native-maps';

const MainScreen: React.FC = () => {
  // latitude 37.4994755
  // longitude 127.0352252
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 37.4994755,
          longitude: 127.0352252,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};

export default MainScreen;
