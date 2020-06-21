import Dropdown from '@monchilin/react-native-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

export function VirtualCurrencyDropdown() {
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
    <Dropdown
      onDropdownWillShow={() => setVisibleState(true)}
      onDropdownWillHide={() => setVisibleState(false)}
      dataSource={DATA_SOURCE}
      index={index}
      onSelect={updateIndex}
      rootContainerStyle={{ width: 150 }}
      showSeparator={false}
      renderItem={(item, _, isActive) => {
        return (
          <View style={[styles.item, isActive && styles.itemActive]}>
            <Text style={{ color: '#FFFFFF' }}>{item}</Text>
          </View>
        );
      }}
    >
      <View style={[styles.labelContainer, styles.item]}>
        <Text style={{ color: '#FFFFFF' }}>
          {DATA_SOURCE[index] ?? '请选择币种'}
        </Text>
        <ArrowDropDown style={{ transform: [{ rotate: rotateInterpolate }] }} />
      </View>
    </Dropdown>
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
