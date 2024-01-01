import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Header} from '../components/Header/Header';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
} from '../services/kakao.api';
import {SingleLineInput} from '../components/SingleLineInput';
import {RegionProps} from '../types/geo.types';

// latitude 37.4994755
// longitude 127.0352252

const MainScreen: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<RegionProps>({
    latitude: 37.4994755,
    longitude: 127.0352252,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  const onChangeLocation = useCallback(
    async ({latitude, longitude}: RegionProps) => {
      setCurrentRegion({
        latitude,
        longitude,
      });

      getAddressFromCoords(latitude, longitude).then(setCurrentAddress);
    },
    [],
  );

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation(position.coords);
    });
  }, [onChangeLocation]);

  const onFindAddress = useCallback(async () => {
    const addressResult = await getCoordsFromAddress(query);

    if (!addressResult) {
      return console.error('주소를 찾을 수 없습니다.');
    }

    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: addressResult.latitude,
      longitude: addressResult.longitude,
    });
  }, [query]);

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
        }}
        onLongPress={e => onChangeLocation(e.nativeEvent.coordinate)}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>

      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해주세요"
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>

      {currentAddress && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MainScreen;
