import React, { useState } from 'react';
import {
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DropdownFlatList,
  ModalDropdown,
} from '@monchilin/react-native-dropdown';
import { AnimatedDownArrow } from '../Common';

const DATA_SOURCE = ['BNA', 'USDI', 'SHUIBI', 'ATC', 'CTC'];

const ArrowDropDown = ({
                         style,
                       }: {
  style: Animated.WithAnimatedValue<StyleProp<ImageStyle>>;
}) => {
  return (
    <Animated.Image
      source={require('../../assets/arrow_drop_down_white.png')}
      style={[{ width: 18, height: 18 }, style]}
    />
  );
};

export default function DemoVirtualCurrencyDropdown() {
  const [visible, setVisibleState] = useState(false);
  const [index, updateIndex] = useState(-1);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ModalDropdown
        triggerContainerProps={{ testID: "asdasd" }}
        transitionHide={'scaleOut'}
        transitionShow={'scaleIn'}
        onModalWillHide={() => setVisibleState(false)}
        onModalWillShow={() => setVisibleState(true)}
        visible={visible}
        Overlay={
          <DropdownFlatList
            data={DATA_SOURCE}
            index={index}
            onSelect={({ index }) => updateIndex(index)}
            renderItem={({ item, isActive }) => {
              return (
                <View style={[styles.item, isActive && styles.itemActive]}>
                  <Text style={{ color: '#FFFFFF' }}>{item}</Text>
                </View>
              );
            }}
          />
        }
        Trigger={
          <TouchableOpacity
            onPress={() => setVisibleState(true)}
            style={[styles.labelContainer, styles.item]}
          >
            <Text style={{ color: '#FFFFFF' }}>
              {DATA_SOURCE[index] ?? 'Select Currency'}
            </Text>
            <AnimatedDownArrow visible={visible}/>
          </TouchableOpacity>
        }
      />
    </View>
  );
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
