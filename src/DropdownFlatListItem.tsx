import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { DropdownFlatListItemProps } from "./type";

export default function DropdownFlatListItem({
                                               item,
                                               activeStyle,
                                               onPress,
                                               ...props
                                             }: DropdownFlatListItemProps) {

  return <TouchableOpacity onPress={onPress}>
    <Text style={[props.style, activeStyle]}>{item}</Text>
  </TouchableOpacity>;
}
