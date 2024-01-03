import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Header} from '../components/Header/Header';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../services/kakao.api';
import {SingleLineInput} from '../components/SingleLineInput';
import {RegionProps} from '../types/geo.types';
import {useRootNavigation} from '../navigation/RootNavigation';
import {Restrant} from '../types/firebase.api.types';
import {getRestrantList} from '../services/firebase.api';

// latitude 37.4994755
// longitude 127.0352252

const MainScreen: React.FC = () => {
  const navigation = useRootNavigation<'Main'>();
  const [currentRegion, setCurrentRegion] = useState<RegionProps>({
    latitude: 37.4994755,
    longitude: 127.0352252,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [markerList, setMarkerList] = useState<Restrant[]>([]);

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
    const keywordResult = await getCoordsFromKeyword(query);
    if (keywordResult) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: keywordResult.latitude,
        longitude: keywordResult.longitude,
      });
      return;
    }

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

  const onPressBottomAddress = useCallback(() => {
    if (!currentAddress) {
      return;
    }

    navigation.navigate('Add', {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      address: currentAddress,
    });
  }, [
    currentAddress,
    currentRegion.latitude,
    currentRegion.longitude,
    navigation,
  ]);

  const onMapReady = useCallback(async () => {
    setIsMapReady(true);
    const restrantList = await getRestrantList();
    setMarkerList(restrantList);
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
        }}
        onLongPress={e => onChangeLocation(e.nativeEvent.coordinate)}
        onMapReady={onMapReady}>
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
          />
        )}
        {isMapReady &&
          markerList.map(({address, latitude, longitude, title}) => {
            return (
              <Marker
                key={address}
                title={title}
                description={address}
                coordinate={{
                  latitude,
                  longitude,
                }}
                pinColor="blue"
              />
            );
          })}
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
          <Pressable
            onPress={onPressBottomAddress}
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default MainScreen;
