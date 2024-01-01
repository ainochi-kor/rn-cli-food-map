import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// latitude 37.4994755
// longitude 127.0352252

const MainScreen: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.4994755,
    longitude: 127.0352252,
  });

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default MainScreen;
