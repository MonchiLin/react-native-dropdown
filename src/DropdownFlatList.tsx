import { FlatList } from 'react-native';
import React from 'react';
import { useModalDropdownContext } from './internal/context';
import DropdownFlatListItem from './DropdownFlatListItem';
import { KeepTouchable } from './internal/components';
import type { DropdownFlatListProps } from "./type";

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
  const context = useModalDropdownContext();

  const _onItemPress = (item: T, itemIndex: number) => {
    const info = { item, index: itemIndex };
    onItemPress?.(info);
    context.onItemPress(info);
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
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ index: itemIndex, item }) => {
        const isActive = itemIndex === index;
        if (typeof renderItem === "function") {
          return KeepTouchable(renderItem({
            item,
            index: itemIndex,
            isActive
          }), { onPress: () => _onItemPress(item, itemIndex) });
        } else {
          return <DropdownFlatListItem
            item={item}
            isActive={isActive}
            onPress={() => _onItemPress(item, itemIndex)}/>;
        }
      }}
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={false}
      {...props}
      style={[
        props.style,
        {
          width: context.overlaySize.width,
        },
      ]}
    />
  );
}
