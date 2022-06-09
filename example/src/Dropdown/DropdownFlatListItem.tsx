import React from 'react';
import { DropdownFlatListItemProps } from './type';
import { useModalDropdownContext } from './internal/context';
import { Text, TouchableOpacity } from 'react-native';

export default function DropdownFlatListItem({
                                               item,
                                               activeStyle,
                                               onPress,
                                               ...props
                                             }: DropdownFlatListItemProps) {
  const context = useModalDropdownContext();
  return <TouchableOpacity onPress={onPress}>
    <Text style={[props.style, activeStyle]}>{item}</Text>
  </TouchableOpacity>;
}
