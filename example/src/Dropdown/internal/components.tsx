import {
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity, TouchableOpacityProps,
  TouchableWithoutFeedback, TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import React from 'react';

export const SplitLine = () => {
  return <View style={styles.splitLint}/>;
};

const styles = StyleSheet.create({
  splitLint: {
    backgroundColor: 'rgb(217, 217, 217)',
    height: 1,
    width: '100%',
  },
});

export const TOUCHABLE_ELEMENTS = [
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'Pressable',
];

export function KeepTouchable(component: JSX.Element, props: TouchableWithoutFeedbackProps) {
  const preservedProps = {
    onPress(event) {
      props.onPress?.(event)
      component.props.onPress?.(event)
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
      case 'Pressable': {
        return <Pressable {...props}>{realChildren}</Pressable>;
      }
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
