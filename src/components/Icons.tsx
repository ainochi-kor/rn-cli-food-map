import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export type IconName = string;

export const Icon: React.FC<{
  name: IconName;
  size: number;
  color: string;
}> = props => {
  return <Ionicons name={props.name} size={props.size} color={props.color} />;
};
