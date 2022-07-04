import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DropdownButtonProps } from './type';
import { DownArrow } from './internal/DownArrow';
import { useModalDropdownContext } from './context';

export default function DropdownButton(props: DropdownButtonProps) {
  const context = useModalDropdownContext();
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (context.visible) {
      Animated.spring(animatedValue.current, {
        toValue: 180,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue.current, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [context.visible]);

  const rotateInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  if ('label' in props) {
    const showIcon = props.Icon !== null;

    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={context.show}
        style={[
          styles.contentContainerStyle,
          styles.border,
          props.contentContainerStyle,
        ]}
      >
        <Text
          style={[
            styles.label,
            props.disabled && styles.labelDisabled,
            props.labelStyle,
          ]}
        >
          {props.label}
        </Text>
        {showIcon ? <View style={{ width: 8 }} /> : null}
        {showIcon ? (
          props.Icon ? (
            props.Icon
          ) : (
            <DownArrow style={{ transform: [{ rotate: rotateInterpolate }] }} />
          )
        ) : null}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.contentContainerStyle,
        styles.border,
        props.contentContainerStyle,
      ]}
    >
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9d9d9',
    borderStyle: 'solid',
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    color: '#000000d9',
  },
  labelDisabled: {
    color: 'rgba(0,0,0,0.5)',
  },
});
