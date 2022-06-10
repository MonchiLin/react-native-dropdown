import React, { useCallback, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View
} from 'react-native';

import Modal from 'react-native-modal';
import type { Handles, Position, Props } from './type';
import { id, truth } from './internal/utils';
import { useAnimation, useBorderWidth, useEffectWithSkipFirst } from './internal/hooks';
import { ModalDropdownProvider } from './internal/context';
import { ModalHideReason, ModalShowReason } from "./reasons";
import DropdownButtonTrigger from "./DropdownButtonTrigger";

function Component<ItemT>(
  {
    visible,
    disabled = false,
    animated = true,
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
  }: Props<ItemT>,
  ref: React.Ref<any>
) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const triggerRef = useRef<View>(null);
  const overlayRef = useRef<View>(null);
  const [triggerFrame, setTriggerFrame] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [overlayFrame, setOverlayFrame] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [overlayVisible, setOverlayVisible] = useState(!!visible);

  const hide = useCallback(() => {
    _onRequestClose(ModalHideReason.WithRef);
  }, []);

  const show = useCallback(() => {
    _onRequestOpen(ModalShowReason.WithRef);
  }, []);

  useEffectWithSkipFirst(() => {
    if (visible) {
      _onRequestOpen(ModalShowReason.VisibleStateChange);
    } else {
      _onRequestClose(ModalHideReason.VisibleStateChange);
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
    getContext: () => {
      return {
        triggerHeight: triggerFrame.h,
        triggerWidth: triggerFrame.w,
      };
    },
  });

  const borderWidthState = useBorderWidth([]);

  const onLayout = (event: LayoutChangeEvent) => {
    // 保持传入的 onLayout 事件
    dropdownProps.onLayout?.(event);
    if (!triggerRef.current) {
      return;
    }
    triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
      setTriggerFrame({ x: px, y: py, w: width, h: height });
    });
  };

  const onOverlayLayout = (event: LayoutChangeEvent) => {
    if (!triggerRef.current) {
      return
    }
    triggerRef.current.measure((_fx, _fy, width, height, px, py) => {
      setOverlayFrame({ x: px, y: py, w: width, h: height });
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

  const _calcPosition = () => {
    // 首先根据 style 的对象获取 dropdown 容器的高度
    const dropdownHeight = triggerFrame.h;

    // x: 按钮的 x 点（相对于屏幕左上角）
    // y: 按钮的 y 点（相对于屏幕顶点）
    // w: 按钮的 width
    // h: 按钮的 height
    const { x, y, w, h } = triggerFrame;

    // 距离底部的空间
    const buttonSpace = windowHeight - y - h;
    // 距离右边的空间
    const rightSpace = windowWidth - x;
    // 如果距离底部的空间大于等于 dropdown 的高度 或者 底部空间
    const showInBottom = buttonSpace >= dropdownHeight || buttonSpace >= y;
    const showInLeft = rightSpace >= x;
    const positionStyle: Position = {
      top: showInBottom ? y + h : Math.max(0, y - dropdownHeight),
    };

    if (showInLeft) {
      positionStyle.left = x;
    } else {
      positionStyle.right = rightSpace - w;
    }

    return adjustFrame(positionStyle);
  };

  const _renderTrigger = useMemo(() => {
    if (typeof Trigger === "function") {
      return <Trigger onPress={() => _onRequestOpen(ModalShowReason.ClickTrigger)}/>;
    } else {
      return <Text onPress={() => _onRequestOpen(ModalShowReason.ClickTrigger)}>{Trigger}</Text>;
    }
  }, [Trigger, disabled]);

  const _renderModel = () => {
    const frameStyle = _calcPosition();
    const dropdownWidth =
      triggerFrame.w === undefined
        // 减去水平边框, 这样可以精确的计算 Trigger 的宽度
        ? triggerFrame.w - borderWidthState.w
        : undefined;
    const dropdownHeight =
      triggerFrame.h === undefined
        // 减去垂直边框, 这样可以精确的计算 Trigger 的宽度
        ? triggerFrame.h - borderWidthState.h
        : undefined;

    return (
      <ModalDropdownProvider
        value={{
          triggerSize: { height: dropdownHeight, width: dropdownWidth },
          onRequestClose: () => _onRequestClose(ModalHideReason.ClickOverlayInside),
        }}
      >
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
                  { position: 'absolute', },
                  animated && dropdownAnimatedStyle,
                ]}
              >
                {Overlay}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ModalDropdownProvider>
    );
  };

  return (
    <View
      {...dropdownProps}
      onLayout={onLayout}
      ref={triggerRef}
      style={[dropdownStyle, { position: "relative" }]}
    >
      {_renderTrigger}
      {_renderModel()}
    </View>
  );
}

export default React.forwardRef(Component) as <T>(
  p: Props<T> & { ref?: React.Ref<Handles> }
) => JSX.Element;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
});
