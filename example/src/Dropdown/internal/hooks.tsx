import { Size, UseAnimationParams, } from '../type';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useModalDropdownContext } from "../context";

export const useEffectWithSkipFirst = (
  callback: React.EffectCallback,
  deps: React.DependencyList
) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const transitions = {
  flipUp: {
    config: {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    }),
    initialValue: 90,
    animationType: 'timing',
  },
  flipDown: {
    config: {
      duration: 200,
      toValue: 90,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 90],
      outputRange: ['0deg', '90deg'],
    }),
    initialValue: 0,
    animationType: 'timing',
  },
  scaleIn: {
    config: {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    initialValue: 0,
    animationType: 'timing',
  },
  scaleOut: {
    config: {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    initialValue: 1,
    animationType: 'timing',
  },
  fadeIn: {
    config: {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    initialValue: 0,
    animationType: 'timing',
  },
  fadeOut: {
    config: {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    initialValue: 1,
    animationType: 'timing',
  },
  slideUp: {
    config: {
      toValue: 100,
      useNativeDriver: false,
    },
    interpolate: (size: Size) => ({
      inputRange: [0, 100],
      duration: 300,
      easing: Easing.in,
      outputRange: [0, size.height],
    }),
    initialValue: 0,
    animationType: 'timing',
  },
  slideDown: {
    config: {
      toValue: 0,
      useNativeDriver: false,
    },
    interpolate: (size: Size) => ({
      inputRange: [0, 100],
      duration: 300,
      easing: Easing.sin,
      outputRange: [0, size.height],
    }),
    initialValue: 100,
    animationType: 'timing',
  },
};

export const useAnimation = ({
                               visible,
                               transitionHide,
                               transitionShow,
                             }: UseAnimationParams) => {
  const [state, setState] = useState(false);
  const anim = useRef(new Animated.Value(90)).current;
  const [style, setStyle] = useState({});
  const context = useModalDropdownContext()

  useEffectWithSkipFirst(() => {
    if (visible) {
      const transitionShowConfig = transitions[transitionShow];
      const interpolate = anim.interpolate(
        transitionShowConfig.interpolate(context.triggerSize)
      );
      anim.setValue(transitionShowConfig.initialValue);
      setState(true);

      switch (transitionShow) {
        case 'flipUp':
          setStyle({ transform: [{ rotateX: interpolate }] });
          break;
        case 'scaleIn':
          setStyle({ transform: [{ scaleX: interpolate, scaleY: 1 }] });
          break;
        case 'fadeIn':
          setStyle({ opacity: interpolate });
          break;
        case 'slideUp':
          setStyle({ height: interpolate });
          break;
        default:
          setStyle({});
      }

      Animated[transitionShowConfig.animationType](
        anim,
        transitionShowConfig.config
      ).start();
    } else {
      const transitionHideConfig = transitions[transitionHide];
      const interpolate = anim.interpolate(
        transitionHideConfig.interpolate(context.triggerSize)
      );
      anim.setValue(transitionHideConfig.initialValue);

      switch (transitionHide) {
        case 'flipDown':
          setStyle({ transform: [{ rotateX: interpolate }] });
          break;
        case 'scaleOut':
          setStyle({ transform: [{ scaleX: interpolate, scaleY: 1 }] });
          break;
        case 'fadeOut':
          setStyle({ opacity: interpolate });
          break;
        case 'slideDown':
          setStyle({ height: interpolate });
          break;
        default:
          setStyle({});
      }

      Animated[transitionHideConfig.animationType](
        anim,
        transitionHideConfig.config
      ).start(() => {
        setState(false);
      });
    }
  }, [visible]);

  return {
    visible: state,
    style,
  };
};

type useSizeParameters = {
  heightSourceStyle: StyleProp<ViewStyle>[];
  widthSourceStyle: StyleProp<ViewStyle>[];
};

export const useSize = ({
                          heightSourceStyle,
                          widthSourceStyle,
                        }: useSizeParameters) => {
  const height = useMemo(() => {
    const style = StyleSheet.flatten(
      heightSourceStyle.find((item) => StyleSheet.flatten(item).height)
    );
    const _height = style?.height ? style.height.toString() : "0";
    return Number.parseFloat(_height);
  }, [heightSourceStyle]);

  const width = useMemo(() => {
    const style = StyleSheet.flatten(
      widthSourceStyle.find((item) => StyleSheet.flatten(item).width)
    );
    const _width = style?.width ? style.width.toString() : "0";
    return Number.parseFloat(_width);
  }, [widthSourceStyle]);

  return {
    height,
    width,
  };
};

export const useBorderWidth = (styles: ViewStyle[]) => {
  // 获取 Trigger 的水平边框, 这样可以精确的计算 Trigger 的宽度
  const borderState = useMemo(() => {
    const style: ViewStyle = StyleSheet.flatten(styles);
    const borderLeftWidth = style.borderLeftWidth || style.borderWidth || 0;
    const borderRightWidth = style.borderRightWidth || style.borderWidth || 0;
    const borderTopWidth = style.borderTopWidth || style.borderWidth || 0;
    const borderBottomWidth = style.borderBottomWidth || style.borderWidth || 0;

    return {
      left: borderLeftWidth,
      right: borderRightWidth,
      bottom: borderTopWidth,
      top: borderBottomWidth,
      w: borderLeftWidth + borderRightWidth,
      h: borderTopWidth + borderBottomWidth,
    };
  }, [styles]);

  return borderState;
};
