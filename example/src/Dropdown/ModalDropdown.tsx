import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
  Text
} from 'react-native';

import Modal from 'react-native-modal';

import type { Handles, Position, Props } from './type';
import { id, truth } from './internal/utils';
import { useAnimation, usePosition } from './internal/hooks';
import { ModalDropdownProvider } from './internal/context';

function Component<ItemT>(
  {
    disabled = false,
    animated = true,
    transitionShow = 'fadeIn',
    transitionHide = 'fadeOut',
    adjustFrame = id,
    onModalWillHide = truth,
    onModalWillShow = truth,
    rootContainerStyle = {},
    rootContainerProps = {},
    modalProps = {},
    Trigger,
    Overlay,
  }: Props<ItemT>,
  ref: React.Ref<any>
) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const _button = useRef<TouchableOpacity>(null);
  const _buttonFrame = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropDownSize = usePosition({
    heightSourceStyle: [rootContainerStyle, styles.dropdown],
    widthSourceStyle: [rootContainerStyle, rootContainerStyle],
  });

  const {
    style: dropdownAnimatedStyle,
    visible: _dropdownVisibleForAnimation,
  } = useAnimation({
    visible: dropdownVisible,
    transitionHide,
    transitionShow,
    meta: {
      dropdownHeight: dropDownSize.height,
      dropdownWidth: dropDownSize.width,
    },
  });

  const hide = useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const show = useCallback(() => {
    setDropdownVisible(true);
  }, []);

  useImperativeHandle(ref, () => ({
    hide,
    show,
  }));

  const onLayout = () => {
    if (!_button.current?.measure) {
      return;
    }
    _button.current.measure((_fx, _fy, width, height, px, py) => {
      _buttonFrame.current = { x: px, y: py, w: width, h: height };
    });
  };

  const _onRequestClose = () => {
    if (onModalWillHide() !== false) {
      hide();
    }
  };

  const _onModalPress = () => {
    if (onModalWillHide() !== false) {
      hide();
    }
  };

  const _onLabelPress = () => {
    if (onModalWillShow() !== false) {
      show();
    }
  };

  const getDropdownHorizontalBorderWidthFromStyle = useCallback(() => {
    const style: ViewStyle = StyleSheet.flatten([
      rootContainerStyle,
      styles.dropdown,
    ]);
    const borderWidth = style.borderWidth ?? 0;
    const borderLeftWidth = style.borderLeftWidth ?? 0;
    const borderRightWidth = style.borderRightWidth ?? 0;

    if (!borderLeftWidth && !borderRightWidth) {
      return borderWidth * 2;
    }

    return borderLeftWidth + borderRightWidth;
  }, [rootContainerStyle]);

  const _calcPosition = () => {
    // 首先根据 style 的对象获取 dropdown 容器的高度
    const dropdownHeight = dropDownSize.height;

    // x: 按钮的 x 点（相对于屏幕左上角）
    // y: 按钮的 y 点（相对于屏幕顶点）
    // w: 按钮的 width
    // h: 按钮的 height
    const { x, y, w, h } = _buttonFrame.current;

    // 距离底部的空间
    const buttonSpace = windowHeight - y - h;
    // 距离右边的空间
    const rightSpace = windowWidth - x;
    // 如果距离底部的空间大于等于 dropdown 的高度 或者 底部空间
    const showInBottom = buttonSpace >= dropdownHeight || buttonSpace >= y;
    const showInLeft = rightSpace >= x;
    const positionStyle: Position = {
      height: dropdownHeight,
      top: showInBottom ? y + h : Math.max(0, y - dropdownHeight),
    };

    if (showInLeft) {
      positionStyle.left = x;
    } else {
      const dropdownWidth = dropDownSize.width;
      if (dropdownWidth !== -1) {
        positionStyle.width = dropdownWidth;
      }
      positionStyle.right = rightSpace - w;
    }

    return adjustFrame(positionStyle);
  };

  const _renderLabel = <TouchableOpacity
    onLayout={onLayout}
    ref={_button}
    disabled={disabled}
    onPress={_onLabelPress}
    style={[disabled && styles.labelContainerDisabled]}
  >
    {
      typeof Trigger === "object"
        ? Trigger
        : <Text>{Trigger}</Text>
    }
  </TouchableOpacity>;

  const onItemPress = (info: { item: any, index: number }) => {
    _onRequestClose();
  };

  const _renderModel = () => {
    const frameStyle = _calcPosition();
    const dropdownWidth =
      dropDownSize.width !== -1
        ? dropDownSize.width - getDropdownHorizontalBorderWidthFromStyle()
        : undefined;
    const dropdownHeight = dropDownSize.height;

    return (
      <ModalDropdownProvider
        value={{
          overlaySize: { height: dropdownHeight, width: dropdownWidth },
          onItemPress: onItemPress,
        }}
      >
        <Modal
          statusBarTranslucent
          {...modalProps}
          // remove default margin
          style={[modalProps?.style, { margin: 0 }]}
          hasBackdrop={false}
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={_dropdownVisibleForAnimation}
          onBackButtonPress={_onRequestClose}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}
        >
          <TouchableWithoutFeedback
            disabled={!dropdownVisible}
            onPress={_onModalPress}
          >
            <View style={styles.modal}>
              <Animated.View
                style={[
                  styles.dropdown,
                  frameStyle,
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
      onLayout={onLayout}
      {...rootContainerProps}
      style={[rootContainerStyle, { position: "relative" }]}
    >
      {_renderLabel}
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
  modal: {
    flexGrow: 1,
  },
  dropdown: {
    height: (33 + StyleSheet.hairlineWidth) * 4,
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
  labelContainerDisabled: {
    backgroundColor: '#fff',
  }
});
