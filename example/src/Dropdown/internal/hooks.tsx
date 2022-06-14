import { AnimationExecute, Bounds, } from '../type';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { setImmediatePromise } from "./utils";

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
    getInterpolate: () => ({
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
    getInterpolate: () => ({
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
    getInterpolate: () => ({
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
    getInterpolate: () => ({
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
    getInterpolate: () => ({
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
    getInterpolate: () => ({
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
    getInterpolate: (triggerBounds: Bounds) => ({
      inputRange: [0, 100],
      outputRange: [0, triggerBounds.h],
    }),
    initialValue: 0,
    animationType: 'timing',
  },
  slideDown: {
    config: {
      toValue: 0,
      useNativeDriver: false,
    },
    getInterpolate: (triggerBounds: Bounds) => ({
      inputRange: [0, 100],
      outputRange: [0, triggerBounds.h],
    }),
    initialValue: 100,
    animationType: 'timing',
  },
};

export const useAnimation = () => {
  const [visible, setVisible] = useState(false);
  const anim = useRef(new Animated.Value(90)).current;
  const [animatedStyle, setAnimatedStyle] = useState({});

  const show: AnimationExecute = ({ transitionShow, overlayBounds }) => {
    const transitionShowConfig = transitions[transitionShow];
    const interpolate = anim.interpolate(transitionShowConfig.getInterpolate(overlayBounds));
    anim.setValue(transitionShowConfig.initialValue);
    switch (transitionShow) {
      case 'flipUp':
        setAnimatedStyle({ transform: [{ rotateX: interpolate }] });
        break;
      case 'scaleIn':
        setAnimatedStyle({ transform: [{ scaleX: interpolate, scaleY: 1 }] });
        break;
      case 'fadeIn':
        setAnimatedStyle({ opacity: interpolate });
        break;
      case 'slideUp':
        setAnimatedStyle({ height: interpolate });
        break;
      default:
        setAnimatedStyle({});
    }

    return new Promise((resolve) => {
      Animated[transitionShowConfig.animationType](
        anim,
        transitionShowConfig.config,
      ).start(() => {
        resolve();
      });
    });
  };

  const hide: AnimationExecute = ({ overlayBounds, transitionHide }) => {
    const transitionHideConfig = transitions[transitionHide];
    const interpolate = anim.interpolate(transitionHideConfig.getInterpolate(overlayBounds));
    anim.setValue(transitionHideConfig.initialValue);

    switch (transitionHide) {
      case 'flipDown':
        setAnimatedStyle({ transform: [{ rotateX: interpolate }] });
        break;
      case 'scaleOut':
        setAnimatedStyle({ transform: [{ scaleX: interpolate, scaleY: 1 }] });
        break;
      case 'fadeOut':
        setAnimatedStyle({ opacity: interpolate });
        break;
      case 'slideDown':
        setAnimatedStyle({ height: interpolate });
        break;
      default:
        setAnimatedStyle({});
    }

    return new Promise<void>(resolve => {
      Animated[transitionHideConfig.animationType](
        anim,
        transitionHideConfig.config
      ).start(() => {
        setVisible(false);
        resolve();
      });
    });
  };

  return {
    visible,
    animatedStyle,
    show,
    hide,
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
  // 获取 Trigger 的精准边框, 这样可以更精确的的计算 Trigger 的尺寸
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
