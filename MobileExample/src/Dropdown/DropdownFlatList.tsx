import {
  FlatList,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { DropdownFlatListProps } from './type';
import DropdownFlatListItem from './DropdownFlatListItem';
import { KeepTouchable } from './internal/components';
import { useModalDropdownContext } from './context';

export default function DropdownFlatList<T extends string | number>({
  data,
  renderItem,
  onAntiSelect,
  onSelect,
  onItemPress,
  index,
  defaultIndex,
  ...props
}: DropdownFlatListProps<T>) {
  const windowDimensions = useWindowDimensions();
  const context = useModalDropdownContext();

  const _onItemPress = (item, itemIndex) => {
    const info = { item, index: itemIndex };
    onItemPress?.(info);
    context.onRequestClose();
    if (index === itemIndex) {
      onAntiSelect?.(info);
    } else {
      onSelect?.(info);
    }
  };

  return (
    <FlatList
      scrollEnabled={true}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ index: itemIndex, item }) => {
        const isActive = itemIndex === index;
        if (typeof renderItem === 'function') {
          return KeepTouchable(
            renderItem({
              item,
              index,
              isActive,
            }),
            { onPress: () => _onItemPress(item, itemIndex) }
          );
        } else {
          return (
            <DropdownFlatListItem
              label={item}
              isActive={isActive}
              onPress={() => _onItemPress(item, itemIndex)}
            />
          );
        }
      }}
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={false}
      {...props}
      style={[
        {
          backgroundColor: '#ffffff',
          height: windowDimensions.height / 5,
        },
        { width: context.triggerBounds.w },
        props.style,
      ]}
    />
  );
}
