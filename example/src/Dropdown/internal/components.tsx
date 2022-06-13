import {
  Animated,
  ImageProps,
  ImageStyle,
  Pressable,
  StyleProp,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import React from 'react';

const _iconBase64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAABZklEQVR4nO3aPU7DQBRF4RMKDGw8EkKiTgGLoECsiIYCiR9RmiJxE8Wx48xM3tjnk1z7vqMUkRKQJEmSJEmSJEmSJEmSJMWx2j3F3AIb4Af4AO6BpuSAwhrgAfgE/oAn4K7EizdAu/e8Ms/YDdvb9u99zv3iFfB94MVzjN0XuQV+gavcA756Xj6n2Mcit2wbZPd4ZMAcYg9Fbtk2CDGk1tjhbrsGXgYGvQE3pQYlEPamsMMmCH9L+IEjVHNDNUMPqG57dYOpczNQ1/Cath5UwwE1bBwl8iGRt00S8aCIm5KIdFikLVlEODDChiIueehiIncucfDiIndKHr7YyJ0SARYfuZMzhJH35Ahi5B4pwxh5QIpARh7pnFBGPtGUYEae6JRwRj7T2J/7Q/0loFZjPq1+khOZGtvIE5wa28hnGBvbyAkMxTZyQn2xjZxBA6yB992zxq9wkiRJkiRJkiRJkiRJkqTy/gHHXxTfFM457gAAAABJRU5ErkJggg==`;

export const DownArrow = ({
                            style,
                            ...props
                          }: Omit<ImageProps, "source" | "style"> & { style: Animated.WithAnimatedValue<StyleProp<ImageStyle>> }) => {
  return <Animated.Image
    {...props}
    style={[{ width: 10, height: 10 }, style]}
    source={{ uri: _iconBase64 }}
  />;
};

const TOUCHABLE_ELEMENTS = [
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'Pressable',
];

export function KeepTouchable(component: JSX.Element, props: TouchableWithoutFeedbackProps) {
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
        return <TouchableHighlight {...props}>{realChildren}</TouchableHighlight>;
      }
      case 'TouchableOpacity': {
        return <TouchableOpacity {...props}>{realChildren}</TouchableOpacity>;
      }
      case 'TouchableWithoutFeedback': {
        return (
          <TouchableWithoutFeedback {...props}>{realChildren}</TouchableWithoutFeedback>
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
