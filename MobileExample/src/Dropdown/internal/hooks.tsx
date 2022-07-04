import { AnimationExecute, Bounds, ModalDropdownAnimations } from '../type';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { OverlayStrategy } from "../enums";

// 跳过第一次, 并且仅在 whenDeps 改变时触发
export const useEffectWhenWithSkipFirst = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  whenDeps: React.DependencyList
) => {
  const isFirstRun = useRef(true);
  const whenRef = useRef(whenDeps || []);
  const initial = whenRef.current === whenDeps;
  const whenDepsChanged =
    initial || !whenRef.current.every((w, i) => w === whenDeps[i]);
  whenRef.current = whenDeps;
  const nullDeps = deps.map(() => null);

  return useEffect(
    () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      return whenDepsChanged && effect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    whenDepsChanged ? deps : nullDeps
  );
};

type Transition = {
  config: {
    duration?: number;
    toValue: number;
    useNativeDriver: boolean;
  };
  interpolate?: {
    inputRange: any[];
    outputRange: any[];
  };
  initialValue: number;
  animationType: 'timing' | 'spring';
};

const getTransition = (
  transitionType:
    | ModalDropdownAnimations['transitionHide']
    | ModalDropdownAnimations['transitionShow'],
  context: { overlayBounds: Bounds }
): Transition => {
  // Shallow cloning
  const translation: Transition = JSON.parse(
    JSON.stringify(transitions[transitionType])
  );

  switch (transitionType) {
    case 'fadeIn':
    case 'fadeOut':
    case 'flipDown':
    case 'flipUp':
    case 'scaleIn':
    case 'scaleOut':
      return translation;
    case 'slideUp':
      translation.interpolate = {
        inputRange: [0, context.overlayBounds.h],
        outputRange: [0, context.overlayBounds.h],
      };
      translation.initialValue = 0;
      translation.config.toValue = context.overlayBounds.h;
      return translation;
    case 'slideDown':
      translation.interpolate = {
        inputRange: [0, context.overlayBounds.h],
        outputRange: [0, context.overlayBounds.h],
      };
      translation.initialValue = context.overlayBounds.h;
      translation.config.toValue = 0;
      return translation;
  }
};

const duration = 200

const transitions: Record<string, Transition> = {
  flipUp: {
    config: {
      duration: duration,
      toValue: 0,
      useNativeDriver: true,
    },
    interpolate: {
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    },
    initialValue: 90,
    animationType: 'timing',
  },
  flipDown: {
    config: {
      duration: duration,
      toValue: 90,
      useNativeDriver: true,
    },
    interpolate: {
      inputRange: [0, 90],
      outputRange: ['0deg', '90deg'],
    },
    initialValue: 0,
    animationType: 'timing',
  },
  scaleIn: {
    config: {
      duration: duration,
      toValue: 1,
      useNativeDriver: true,
    },
    interpolate: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
    initialValue: 0,
    animationType: 'timing',
  },
  scaleOut: {
    config: {
      duration: duration,
      toValue: 0,
      useNativeDriver: true,
    },
    interpolate: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
    initialValue: 1,
    animationType: 'timing',
  },
  fadeIn: {
    config: {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    },
    interpolate: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
    initialValue: 0,
    animationType: 'timing',
  },
  fadeOut: {
    config: {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    },
    interpolate: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
    initialValue: 1,
    animationType: 'timing',
  },
  slideUp: {
    config: {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    },
    initialValue: 0,
    animationType: 'timing',
  },
  slideDown: {
    config: {
      toValue: 0,
      duration: duration,
      useNativeDriver: false,
    },
    initialValue: 0,
    animationType: 'timing',
  },
};

export const useAnimation = () => {
  const animatedValueRef = useRef(new Animated.Value(90));
  const [animatedStyle, setAnimatedStyle] = useState({});
  // 避免重复执行动画效果
  // const isClosing = useRef(false);
  // const isShowing = useRef(false);

  const show: AnimationExecute = ({ transitionShow, overlayBounds }) => {
    // if (isShowing.current) {
    //   return Promise.reject('Already showing');
    // }

    const transition = getTransition(transitionShow, {
      overlayBounds,
    });
    const interpolate = animatedValueRef.current.interpolate(
      transition.interpolate!
    );
    animatedValueRef.current.setValue(transition.initialValue);

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
        // 如果上一次执行动画时 useNativeDriver = true 就要重新初始化 Animated.Value 实例,
        // 否则 RN 就会以 useNativeDriver = true 的情况下来执行, 产生 height 无法被动画的 bug
        animatedValueRef.current = new Animated.Value(transition.initialValue);
        setAnimatedStyle({ height: animatedValueRef.current, overflow: 'hidden' });
        break;
      default:
        setAnimatedStyle({});
    }

    // isShowing.current = true;
    return new Promise((resolve) => {
      Animated[transition.animationType](
        animatedValueRef.current,
        transition.config
      ).start(() => {
        setAnimatedStyle((state) => ({ ...state, overflow: 'visible' }));
        resolve();
        // isShowing.current = false;
      });
    });
  };

  const hide: AnimationExecute = ({ overlayBounds, transitionHide }) => {
    // if (isClosing.current) {
    //   return Promise.reject('Already closing');
    // }
    const transition = getTransition(transitionHide, {
      overlayBounds,
    });
    const interpolate = animatedValueRef.current.interpolate(
      transition.interpolate!
    );
    animatedValueRef.current.setValue(transition.initialValue);

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
        animatedValueRef.current = new Animated.Value(transition.initialValue);
        setAnimatedStyle({ height: animatedValueRef.current, overflow: 'hidden' });
        break;
      default:
        setAnimatedStyle({});
    }

    // isClosing.current = true;
    return new Promise<void>((resolve) => {
      Animated[transition.animationType](
        animatedValueRef.current,
        transition.config
      ).start(() => {
        setAnimatedStyle((state) => ({ ...state, overflow: 'visible' }));
        resolve();
        // isClosing.current = false;
      });
    });
  };

  return {
    animatedStyle,
    show,
    hide,
  };
};

// type useSizeParameters = {
//   heightSourceStyle: StyleProp<ViewStyle>[];
//   widthSourceStyle: StyleProp<ViewStyle>[];
// };
//
// export const useSize = ({
//                           heightSourceStyle,
//                           widthSourceStyle,
//                         }: useSizeParameters) => {
//   const height = useMemo(() => {
//     const style = StyleSheet.flatten(
//       heightSourceStyle.find((item) => StyleSheet.flatten(item).height)
//     );
//     const _height = style?.height ? style.height.toString() : '0';
//     return Number.parseFloat(_height);
//   }, [heightSourceStyle]);
//
//   const width = useMemo(() => {
//     const style = StyleSheet.flatten(
//       widthSourceStyle.find((item) => StyleSheet.flatten(item).width)
//     );
//     const _width = style?.width ? style.width.toString() : '0';
//     return Number.parseFloat(_width);
//   }, [widthSourceStyle]);
//
//   return {
//     height,
//     width,
//   };
// };

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

export const useOverlayStrategy = (initialValue: OverlayStrategy = OverlayStrategy.None) => {
  const [state, setState] = useState(initialValue);
  /**
   * overlay 是否显示
   */
  const visible = useMemo(() => {
    switch (state) {
      case OverlayStrategy.Measure:
      case OverlayStrategy.BeforeMounted:
      case OverlayStrategy.Mounted:
      case OverlayStrategy.BeforeUnmounted:
        return true;
      case OverlayStrategy.None:
      case OverlayStrategy.Unmounted:
        return false;
    }
  }, [state]);

  /**
   * 判断是否处于测量阶段
   */
  const isMeasure = useMemo(() => {
    switch (state) {
      case OverlayStrategy.Measure:
        return true;
      case OverlayStrategy.BeforeMounted:
      case OverlayStrategy.Mounted:
      case OverlayStrategy.None:
      case OverlayStrategy.BeforeUnmounted:
      case OverlayStrategy.Unmounted:
        return false;
    }
  }, [state]);

  const change = (newState: OverlayStrategy) => {
    setState(newState);
  }

  return { state, visible, isMeasure, change };
};
