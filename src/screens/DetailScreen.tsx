import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

const DetailScreen: React.FC = () => {
  const onPressBack = useCallback(() => {}, []);
  return (
    <View>
      <Header>
        <Header.Title title="DETAIL" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
};

export default DetailScreen;
