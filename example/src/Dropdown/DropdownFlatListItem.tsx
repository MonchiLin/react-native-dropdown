import React from 'react';
import { DropdownFlatListItemProps } from './type';
import { useModalDropdownContext } from './context';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DropdownFlatListItem(
  {
    label,
    activeContentContainerStyle,
    activeLabelStyle,
    labelStyle,
    contentContainerStyle,
    isActive,
    onPress,
  }: DropdownFlatListItemProps) {
  const context = useModalDropdownContext();

  return <TouchableOpacity
    onPress={onPress}
    style={[styles.contentContainerStyle, contentContainerStyle, (isActive && activeContentContainerStyle)]}
  >
    <Text style={[styles.labelStyle, labelStyle, (isActive && activeLabelStyle)]}>
      {label}
    </Text>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  labelStyle: {
    textAlign: "center"
  },
});
