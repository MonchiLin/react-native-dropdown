import { Animated, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Icon } from '@rneui/themed';

export const AnimatedDownArrow = ({ visible, color = undefined }) => {
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue.current, {
        toValue: 180,
        useNativeDriver: true,
        duration: 200,
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  }, [visible]);

  const rotateInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate: rotateInterpolate }] }]}>
      <Icon
        color={color}
        size={18}
        name={'chevron-down-outline'}
        type={'ionicon'}
      />
    </Animated.View>
  );
};

export const Divider = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: 'gray',
        width: '100%',
        marginVertical: 20,
      }}
    />
  );
};
