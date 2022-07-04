import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { DropdownFlatList, ModalDropdown, } from '@monchilin/react-native-dropdown';
import { BlurView } from "expo-blur";

const DATA_SOURCE = ['BNA', 'USDI', 'SHUIBI', 'ATC', 'CTC'];

export default function DemoBlurView() {
  const [visible, setVisibleState] = useState(false);
  const [index, updateIndex] = useState(-1);

  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ModalDropdown
      onModalWillHide={() => setVisibleState(false)}
      onModalWillShow={() => setVisibleState(true)}
      visible={visible}
      animated={false}
      // 首先, 调整 overlay 的位置, 这样 ModalDropdown 就不会在处理 overlay 的位置
      adjustFrame={i => ({ top: 0, left: 0, right: 0, bottom: 0 })}
      Overlay={
        // 创建全屏的 BlurView
        context => <BlurView
          tint="light"
          intensity={10}
          style={{
            left: 0,
            top: 0,
            position: "absolute",
            width: context.windowSize.width,
            height: context.windowSize.height
          }}
        >
          {/* 从 context 中获取动画样式和 trigger 的位置 */}
          <Animated.View
            style={
              [
                context.animatedStyle,
                {
                  position: "absolute",
                  left: context.triggerBounds.x,
                  top: context.triggerBounds.y
                }
              ]
            }
          >
            <DropdownFlatList
              data={DATA_SOURCE}
              index={index}
              onSelect={({ index }) => updateIndex(index)}
              style={{ width: 100, }}
              renderItem={({ item, isActive }) => {
                return (
                  <View style={[styles.item, isActive && styles.itemActive]}>
                    <Text style={{ color: '#FFFFFF' }}>{item}</Text>
                  </View>
                );
              }}
            />
          </Animated.View>
        </BlurView>
      }
      Trigger={DATA_SOURCE[index] ?? 'Select Currency'}
    />
  </View>;
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#363333',
    padding: 10,
    borderColor: '#3B3B3B',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  itemActive: {
    backgroundColor: '#4180ff',
  },
});
