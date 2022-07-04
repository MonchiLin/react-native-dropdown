import {
  Animated,
  ImageProps,
  ImageStyle,
  LayoutChangeEvent,
  // Pressable,
  StyleProp,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import React, { useRef } from 'react';
import { Bounds } from '@monchilin/react-native-dropdown';

const TOUCHABLE_ELEMENTS = [
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'Pressable',
];

export function KeepTouchable(
  component: JSX.Element,
  props: TouchableWithoutFeedbackProps
) {
  const preservedProps = {
    onPress(event) {
      props.onPress?.(event);
      component.props.onPress?.(event);
    },
  };

  if (TOUCHABLE_ELEMENTS.find((name) => name === component.type.displayName)) {
    const props = {
      ...component.props,
      onPress: preservedProps.onPress,
    };

    const { children: realChildren } = component.props;
    switch (component.type.displayName) {
      case 'TouchableHighlight': {
        return (
          <TouchableHighlight {...props}>{realChildren}</TouchableHighlight>
        );
      }
      case 'TouchableOpacity': {
        return <TouchableOpacity {...props}>{realChildren}</TouchableOpacity>;
      }
      case 'TouchableWithoutFeedback': {
        return (
          <TouchableWithoutFeedback {...props}>
            {realChildren}
          </TouchableWithoutFeedback>
        );
      }
      // case 'Pressable': {
      //   return <Pressable {...props}>{realChildren}</Pressable>;
      // }
      // TODO react native web not support TouchableNativeFeedback
      case 'TouchableNativeFeedback': {
        console.warn('react native web not support TouchableNativeFeedback');
        return (
          <TouchableNativeFeedback {...props}>
            {component}
          </TouchableNativeFeedback>
        );
      }
      default:
        break;
    }
  }

  return <TouchableOpacity {...preservedProps}>{component}</TouchableOpacity>;
}

export const LayoutCapture = ({
  children,
  style,
  onCapture,
}: {
  children: React.ReactNode;
  onCapture: (bounds: Bounds) => void;
  style: StyleProp<ViewStyle>;
}) => {
  const viewRef = useRef<View>(null);
  const bounds = useRef<Bounds>({ x: 0, y: 0, w: 0, h: 0 });

  const onLayout = (_: LayoutChangeEvent) => {
    if (!viewRef.current.measure) {
      return;
    }
    viewRef.current.measure((_fx, _fy, width, height, px, py) => {
      bounds.current = { x: px, y: py, w: width, h: height };
      onCapture(bounds.current);
    });
  };

  return (
    <View
      ref={viewRef}
      onLayout={onLayout}
      style={[{ opacity: 0, flex: 1, position: 'absolute' }, style]}
    >
      {children}
    </View>
  );
};
