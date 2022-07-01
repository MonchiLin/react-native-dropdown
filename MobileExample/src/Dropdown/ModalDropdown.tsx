import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import type { Bounds, EdgeInsets, ModalDropdownContextType, ModalDropdownHandles, ModalDropdownProps, } from './type';
import { id, truth } from './internal/utils';
import { useAnimation, useOverlayStrategy } from './internal/hooks';
import { ModalDropdownProvider } from './context';
import { ModalHideReason, ModalShowReason, OverlayStrategy, } from './enums';
import { KeepTouchable, LayoutCapture } from './internal/components';

function Component(
  {
    safeArea,
    visible,
    animated = true,
    shaded = true,
    placement = 'bottomCenter',
    transitionShow = 'flipUp',
    transitionHide = 'flipDown',
    adjustFrame = id,
    onModalWillHide = truth,
    onModalWillShow = truth,
    triggerContainerProps = {},
    modalProps = {},
    Trigger,
    Overlay,
  }: ModalDropdownProps,
  ref: React.Ref<any>
) {
  const windowDimensions = useWindowDimensions();
  const triggerRef = useRef<View>(null);
  const overlayRef = useRef<View>(null);
  const triggerBounds = useRef<Bounds>({ x: 0, y: 0, w: 0, h: 0 });
  const overlayBounds = useRef<Bounds>({ x: 0, y: 0, w: 0, h: 0 });

  const calcPosition = useCallback(() => {
    // 首先根据 style 的对象获取 dropdown 容器的高度
    const overlayHeight = overlayBounds.current.h;

    // x: 按钮的 x 点（相对于屏幕左上角）
    // y: 按钮的 y 点（相对于屏幕顶点）
    // w: 按钮的 width
    // h: 按钮的 height
    const { x, y, w, h } = triggerBounds.current;

    // 距离底部的空间
    const buttonSpace = windowDimensions.height - y - h;
    // 距离右边的空间
    const rightSpace = windowDimensions.width - x;
    // 如果距离底部的空间大于等于 dropdown 的高度 或者 底部空间
    const showInBottom = buttonSpace >= overlayHeight || buttonSpace >= y;
    const showInLeft = rightSpace >= x;
    const position: EdgeInsets = {
      top: showInBottom ? y + h : Math.max(0, y - overlayHeight),
    };

    if (showInLeft) {
      position.left = x;
    } else {
      position.right = rightSpace - w;
    }

    return adjustFrame(position);
  }, [adjustFrame, windowDimensions]);

  const animationState = useAnimation();

  // overlay 的渲染阶段
  const strategy = useOverlayStrategy(OverlayStrategy.None);

  const _onRequestClose = (reason: ModalHideReason) => {
    if (onModalWillHide(reason) !== false) {
      strategy.change(OverlayStrategy.BeforeUnmounted);
      animationState
        .hide({
          overlayBounds: overlayBounds.current,
          triggerBounds: triggerBounds.current,
          transitionShow,
          transitionHide,
        })
        .then((_) => {
          strategy.change(OverlayStrategy.Unmounted);
        });
    }
  };

  const _onRequestOpen = (reason: ModalShowReason) => {
    if (onModalWillShow(reason) !== false) {
      // 如果是 slideUp 则先测量尺寸, 因为 slideUp 依赖元素高度, 否则就直接渲染
      // if (transitionShow === 'slideUp') {
      //   strategy.change(OverlayStrategy.Measure);
      // } else {
      //   strategy.change(OverlayStrategy.BeforeMounted);
      //   animationState.show({
      //     overlayBounds: overlayBounds.current,
      //     triggerBounds: triggerBounds.current,
      //     transitionShow,
      //     transitionHide,
      //   });
      // }

      strategy.change(OverlayStrategy.Measure);
      animationState.show({
        overlayBounds: overlayBounds.current,
        triggerBounds: triggerBounds.current,
        transitionShow,
        transitionHide,
      });
    }
  };
  // 手动隐藏
  const hide = () => _onRequestClose(ModalHideReason.WithRef);

  // 手动打开
  const show = () => _onRequestOpen(ModalShowReason.WithRef);

  const visiblePrev = useRef(visible);

  useEffect(() => {
    // 如果当前 visible 和之前的 visible 相同, 则说明是 transitionHide or transitionShow 发生变化,
    // 则忽略本次 effect
    if (visiblePrev.current === visible) {
      return;
    } else {
      visiblePrev.current = visible;

      if (visible) {
        _onRequestOpen(ModalShowReason.VisibleStateChange);
      } else {
        _onRequestClose(ModalHideReason.VisibleStateChange);
      }
    }
  }, [visible, transitionHide, transitionShow]);

  useImperativeHandle(ref, () => ({
    hide,
    show,
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    // 保持传入的 onLayout 事件
    triggerContainerProps.onLayout?.(event);
    triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
      triggerBounds.current = { x: px, y: py, w: width, h: height };
    });
  };

  // overlay 自身元素发送变化
  const onOverlayLayout = (_: LayoutChangeEvent) => {
    if (!overlayRef.current?.measure) {
      return;
    }
    overlayRef.current.measure((_fx, _fy, width, height, px, py) => {
      overlayBounds.current = { x: px, y: py, w: width, h: height };
    });
  };

  // overlay 预渲染阶段的尺寸捕获
  const onOverlayCapture = async (bounds: Bounds) => {
    overlayBounds.current = bounds;
    // 先显示动画, 然后等到下个事件循环在更新 OverlayStrategy, 否则在 web 上运行有问题, 会闪烁
    animationState
      .show({
        overlayBounds: overlayBounds.current,
        triggerBounds: triggerBounds.current,
        transitionShow,
        transitionHide,
      })
      .then(res => {
        strategy.change(OverlayStrategy.Mounted);
      });
    setImmediate(() => strategy.change(OverlayStrategy.BeforeMounted));
  };

  const _renderTrigger = useMemo(() => {
    if (typeof Trigger === 'function') {
      return KeepTouchable(<Trigger/>, {
        onPress: () => _onRequestOpen(ModalShowReason.ClickTrigger),
      });
    } else if (typeof Trigger === 'object') {
      return Trigger;
    } else {
      return (
        <TouchableOpacity
          onPress={() => _onRequestOpen(ModalShowReason.ClickTrigger)}
        >
          <Text style={{ color: '#2d8cfe' }}>{Trigger}</Text>
        </TouchableOpacity>
      );
    }
    // transitionShow,transitionHide,overlayBounds is  `_onRequestOpen` deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Trigger, transitionShow, transitionHide]);

  const frameStyle = calcPosition();

  const context: ModalDropdownContextType = {
    triggerBounds: triggerBounds.current,
    overlayBounds: overlayBounds.current,
    windowSize: windowDimensions,
    animatedStyle: animationState.animatedStyle,
    safeArea: safeArea,
    onRequestClose: () =>
      _onRequestClose(ModalHideReason.ClickOverlayInside),
    visible: strategy.visible,
    show: show,
    hide: hide,
  };

  if (triggerContainerProps.testID) {
    console.log("strategy.visible", strategy.state, strategy.visible);
  }

  const _renderModel = (
    <Modal
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      statusBarTranslucent
      {...modalProps}
      // remove default margin
      style={[modalProps?.style, { margin: 0 }]}
      hasBackdrop={false}
      animationInTiming={1}
      animationOutTiming={1}
      isVisible={strategy.visible}
      onBackButtonPress={() => _onRequestClose(ModalHideReason.ClickBackButton)}
    >
      {strategy.isMeasure ? (
        <LayoutCapture onCapture={onOverlayCapture} style={frameStyle}>
          {typeof Overlay === "function" ? <Overlay {...context}/> : Overlay}
        </LayoutCapture>
      ) : (
        strategy.visible && (
          <TouchableWithoutFeedback
            onPress={() => _onRequestClose(ModalHideReason.ClickOverlayOutside)}
          >
            <View style={{ flex: 1 }}>
              <Animated.View
                ref={overlayRef}
                onLayout={onOverlayLayout}
                style={[
                  frameStyle,
                  { position: 'absolute' },
                  shaded && style.shadow,
                  animated && animationState.animatedStyle,
                ]}
              >
                {typeof Overlay === "function" ? <Overlay {...context}/> : Overlay}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        )
      )}
    </Modal>
  );

  return (
    <ModalDropdownProvider value={context}>
      <View
        {...triggerContainerProps}
        onLayout={onLayout}
        ref={triggerRef}
        style={[triggerContainerProps.style, { position: 'relative' }]}
      >
        {_renderTrigger}
        {_renderModel}
      </View>
    </ModalDropdownProvider>
  );
}

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#6b6b6b',

    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
  },
});

export default React.forwardRef(Component) as (
  p: ModalDropdownProps & { ref?: React.Ref<ModalDropdownHandles> }
) => JSX.Element;
