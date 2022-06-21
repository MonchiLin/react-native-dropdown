import React, { useState } from 'react';
import {
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  DropdownFlatList,
  ModalDropdown,
} from '@monchilin/react-native-dropdown';
import { AnimatedDownArrow } from '../Common';
import { BlurView } from "expo-blur";

const DATA_SOURCE = ['BNA', 'USDI', 'SHUIBI', 'ATC', 'CTC'];

export default function DemoBlurView() {
  const [visible, setVisibleState] = useState(false);
  const [index, updateIndex] = useState(-1);

  const uri = 'https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png';

  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ModalDropdown
      onModalWillHide={() => setVisibleState(false)}
      onModalWillShow={() => setVisibleState(true)}
      visible={visible}
      animated={false}
      // 第一步, 调整
      adjustFrame={i => ({ top: 0, left: 0, right: 0, bottom: 0 })}
      Overlay={
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
          <DropdownFlatList
            data={DATA_SOURCE}
            index={index}
            onSelect={({ index }) => updateIndex(index)}
            style={{ width: 100, position: "absolute", left: context.triggerBounds.x, top: context.triggerBounds.y }}
            renderItem={({ item, isActive }) => {
              return (
                <View style={[styles.item, isActive && styles.itemActive]}>
                  <Text style={{ color: '#FFFFFF' }}>{item}</Text>
                </View>
              );
            }}
          />
        </BlurView>}
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
