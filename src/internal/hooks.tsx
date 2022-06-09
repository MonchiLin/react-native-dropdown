import { UseAnimationProps, UseAnimationPropsMeta, UsePositionProps, } from '../type';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

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
      duration: 300,
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
      duration: 300,
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
    interpolate: (meta: UseAnimationPropsMeta) => ({
      inputRange: [0, 100],
      duration: 800,
      easing: Easing.in,
      outputRange: [0, meta.dropdownHeight],
    }),
    initialValue: 0,
    animationType: 'timing',
  },
  slideDown: {
    config: {
      toValue: 0,
      useNativeDriver: false,
    },
    interpolate: (meta: UseAnimationPropsMeta) => ({
      inputRange: [0, 100],
      duration: 800,
      easing: Easing.sin,
      outputRange: [0, meta.dropdownHeight],
    }),
    initialValue: 100,
    animationType: 'timing',
  },
};

export const useAnimation = ({
                               visible,
                               transitionHide,
                               transitionShow,
                               meta,
                             }: UseAnimationProps) => {
  const [state, setState] = useState(false);
  const anim = useRef(new Animated.Value(90)).current;
  const [style, setStyle] = useState({});

  useEffectWithSkipFirst(() => {
    if (visible) {
      const transitionShowConfig = transitions[transitionShow];
      const interpolate = anim.interpolate(
        transitionShowConfig.interpolate(meta)
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
        transitionHideConfig.interpolate(meta)
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

export const usePosition = ({
                              heightSourceStyle,
                              widthSourceStyle,
                            }: UsePositionProps) => {
  const height = useMemo(() => {
    const style = StyleSheet.flatten(
      heightSourceStyle.find((item) => StyleSheet.flatten(item).height)
    );
    const _height = style?.height ? style.height.toString() : '-1';
    return Number.parseFloat(_height);
  }, [heightSourceStyle]);

  const width = useMemo(() => {
    const style = StyleSheet.flatten(
      widthSourceStyle.find((item) => StyleSheet.flatten(item).width)
    );
    const _width = style?.width ? style.width.toString() : '-1';
    return Number.parseFloat(_width);
  }, [widthSourceStyle]);

  return {
    height,
    width,
  };
};
