import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import ModelDropdown from "@monchilin/react-native-dropdown";
import { DropdownFlatList } from "@monchilin/react-native-dropdown";

const DATA_SOURCE = ['BNA', 'USDI', 'SHUIBI', 'ATC', 'CTC'];

const ArrowDropDown = ({
                         style,
                       }: {
  style: Animated.WithAnimatedValue<StyleProp<ImageStyle>>;
}) => {
  return (
    <Animated.Image
      source={require('../assets/arrow_drop_down_white.png')}
      style={[{ width: 18, height: 18 }, style]}
    />
  );
};

export default function DemoVirtualCurrencyDropdown() {
  const [visible, setVisibleState] = useState(false);
  const [index, updateIndex] = useState(-1);
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue.current, {
        toValue: 180,
        useNativeDriver: true,
        delay: 100,
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        useNativeDriver: true,
        delay: 100,
      }).start();
    }
  }, [visible]);

  const rotateInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <ModelDropdown
      onModalWillHide={() => setVisibleState(true)}
      onModalWillShow={() => setVisibleState(false)}
      Overlay={<DropdownFlatList
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
      />}
      Trigger={
        props => <TouchableOpacity onPress={props.onPress} style={[styles.labelContainer, styles.item]}>
          <Text style={{ color: '#FFFFFF' }}>
            {DATA_SOURCE[index] ?? 'Select Currency'}
          </Text>
          <ArrowDropDown style={{ transform: [{ rotate: rotateInterpolate }] }}/>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#1F1F21',
    padding: 10,
    borderColor: '#3B3B3B',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  itemActive: {
    backgroundColor: '#2C61D5',
  },
});
