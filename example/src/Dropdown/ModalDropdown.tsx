import React, { useCallback, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { Animated, LayoutChangeEvent, Text, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';

import Modal from 'react-native-modal';
import type { EdgeInsets, Bounds, Handles, Props } from './type';
import { id, truth } from './internal/utils';
import { useAnimation, useBorderWidth, useEffectWithSkipFirst } from './internal/hooks';
import { ModalDropdownProvider } from './context';
import { ModalHideReason, ModalShowReason } from "./reasons";
import { KeepTouchable } from "./internal/components";

function Component(
  {
    safeArea,
    visible,
    animated = true,
    placement = "bottomCenter",
    transitionShow = 'flipUp',
    transitionHide = 'flipDown',
    adjustFrame = id,
    onModalWillHide = truth,
    onModalWillShow = truth,
    dropdownProps = {},
    dropdownStyle = {},
    modalProps = {},
    Trigger,
    Overlay,
  }: Props,
  ref: React.Ref<any>
) {
  const windowDimensions = useWindowDimensions();

  const triggerRef = useRef<View>(null);
  const overlayRef = useRef<View>(null);
  const [triggerBounds, setTriggerBounds] = useState<Bounds>({ x: 0, y: 0, w: 0, h: 0 });
  const [overlayBounds, setOverlayBounds] = useState<Bounds>({ x: 0, y: 0, w: 0, h: 0 });
  const [overlayVisible, setOverlayVisible] = useState(!!visible);

  const hide = useCallback(() => {
    _onRequestClose(ModalHideReason.WithRef);
  }, []);

  const show = useCallback(() => {
    _onRequestOpen(ModalShowReason.WithRef);
  }, []);

  useEffectWithSkipFirst(() => {
    if (visible) {
      setOverlayVisible(true);
    } else {
      setOverlayVisible(false);
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    hide,
    show,
  }));

  const {
    style: dropdownAnimatedStyle,
    visible: _dropdownVisibleForAnimation,
  } = useAnimation({
    visible: overlayVisible,
    transitionHide,
    transitionShow,
  });

  const borderWidthState = useBorderWidth([]);

  const onLayout = (event: LayoutChangeEvent) => {
    // 保持传入的 onLayout 事件
    dropdownProps.onLayout?.(event);
    if (!triggerRef.current) {
      return;
    }
    triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
      setTriggerBounds({ x: px, y: py, w: width, h: height });
    });
  };

  const onOverlayLayout = (_: LayoutChangeEvent) => {
    if (!triggerRef.current) {
      return;
    }
    triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
      setOverlayBounds({ x: px, y: py, w: width, h: height });
    });
  };

  const _onRequestClose = (reason: ModalHideReason) => {
    if (onModalWillHide(reason) !== false) {
      setOverlayVisible(false);
    }
  };

  const _onRequestOpen = (reason: ModalShowReason) => {
    if (onModalWillShow(reason) !== false) {
      setOverlayVisible(true);
    }
  };

  const frameStyle = useMemo(() => {
    // 首先根据 style 的对象获取 dropdown 容器的高度
    const dropdownHeight = triggerBounds.h;

    // x: 按钮的 x 点（相对于屏幕左上角）
    // y: 按钮的 y 点（相对于屏幕顶点）
    // w: 按钮的 width
    // h: 按钮的 height
    const { x, y, w, h } = triggerBounds;

    // 距离底部的空间
    const buttonSpace = windowDimensions.height - y - h;
    // 距离右边的空间
    const rightSpace = windowDimensions.width - x;
    // 如果距离底部的空间大于等于 dropdown 的高度 或者 底部空间
    const showInBottom = buttonSpace >= dropdownHeight || buttonSpace >= y;
    const showInLeft = rightSpace >= x;
    const positionStyle: EdgeInsets = {
      top: showInBottom ? y + h : Math.max(0, y - dropdownHeight),
    };

    if (showInLeft) {
      positionStyle.left = x;
    } else {
      positionStyle.right = rightSpace - w;
    }

    return adjustFrame(positionStyle);
  }, [adjustFrame, triggerBounds, windowDimensions]);

  const _renderTrigger = useMemo(() => {
    if (typeof Trigger === "function") {
      return KeepTouchable(<Trigger/>, { onPress: () => _onRequestOpen(ModalShowReason.ClickTrigger) });
    } else if (typeof Trigger === "object") {
      return Trigger;
    } else {
      return <Text style={{ color: "#2d8cfe" }} onPress={() => _onRequestOpen(ModalShowReason.ClickTrigger)}>{Trigger}</Text>;
    }
  }, [Trigger]);

  const _renderModel = <Modal
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
    isVisible={_dropdownVisibleForAnimation}
    onBackButtonPress={() => _onRequestClose(ModalHideReason.ClickBackButton)}
  >
    <TouchableWithoutFeedback
      disabled={!overlayVisible}
      onPress={() => _onRequestClose(ModalHideReason.ClickOverlayOutside)}
    >
      <View style={{ flex: 1 }}>
        <Animated.View
          ref={overlayRef}
          onLayout={onOverlayLayout}
          style={[
            frameStyle,
            { position: 'absolute' },
            animated && dropdownAnimatedStyle,
          ]}
        >
          {Overlay}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>;

  const triggerSize = useMemo(() => {
    return {
      width: triggerBounds.w === undefined
        ? undefined
        // 减去水平边框, 这样可以精确的计算 Trigger 的宽度
        : triggerBounds.w - borderWidthState.w,
      height: triggerBounds.h === undefined
        ? undefined
        // 减去垂直边框, 这样可以精确的计算 Trigger 的宽度
        : triggerBounds.h - borderWidthState.h,
    };
  }, [triggerBounds]);

  const triggerPosition = useMemo<EdgeInsets>(() => {
    return {
      left: triggerBounds.x,
      top: triggerBounds.y,
    };
  }, [triggerBounds, triggerSize]);

  return (
    <ModalDropdownProvider
      value={{
        triggerSize: triggerSize,
        triggerPosition: triggerPosition,
        safeArea: safeArea,
        onRequestClose: () => _onRequestClose(ModalHideReason.ClickOverlayInside),
        visible: overlayVisible,
        show: show,
        hide: hide,
      }}
    >
      <View
        {...dropdownProps}
        onLayout={onLayout}
        ref={triggerRef}
        style={[dropdownStyle, { position: "relative" }]}
      >
        {_renderTrigger}
        {_renderModel}
      </View>
    </ModalDropdownProvider>
  );
}

export default React.forwardRef(Component) as (
  p: Props & { ref?: React.Ref<Handles> }
) => JSX.Element;

