import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import Modal from './Modal';
import {
  Position,
  Props,
  UseAnimationProps,
  UseAnimationPropsMeta,
  UsePositionProps,
} from './type';

const truth = () => true;
const isNumber = (o: unknown): o is number => typeof o === 'number';

function id<T>(v: T): T {
  return v;
}

const TOUCHABLE_ELEMENTS = [
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
];

// TODO react native for web not support useWindowDimensions()
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const useEffectWithSkipFirst = (
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

const useAnimation = ({
  visible,
  transitionHide,
  transitionShow,
  meta,
}: UseAnimationProps) => {
  const [state, setState] = useState(false);
  const anim = useRef(new Animated.Value(90)).current;
  const [style, setStyle] = useState({});

  // useEffect(() => {
  //   anim.addListener(e => {
  //     console.log("value => ", e)
  //   })
  // }, [])

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

      // @ts-ignore
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

      // @ts-ignore
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

const transitions = {
  flipUp: {
    config: {
      toValue: 0,
      friction: 10,
      tension: 20,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    }),
    initialValue: 90,
    animationType: 'spring',
  },
  flipDown: {
    config: {
      toValue: 90,
      friction: 10,
      tension: 40,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 90],
      outputRange: ['0deg', '90deg'],
    }),
    initialValue: 0,
    animationType: 'spring',
  },
  scaleIn: {
    config: {
      toValue: 1,
      friction: 10,
      tension: 10,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    initialValue: 0,
    animationType: 'spring',
  },
  scaleOut: {
    config: {
      toValue: 0,
      friction: 10,
      tension: 10,
      useNativeDriver: true,
    },
    interpolate: () => ({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    initialValue: 1,
    animationType: 'spring',
  },
  fadeIn: {
    config: {
      toValue: 1,
      duration: 500,
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
      duration: 500,
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
      delay: 800,
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
      delay: 800,
      easing: Easing.sin,
      outputRange: [0, meta.dropdownHeight],
    }),
    initialValue: 100,
    animationType: 'timing',
  },
};

const usePosition = ({
  heightSourceStyle,
  widthSourceStyle,
}: UsePositionProps) => {
  const getHeight = useCallback(() => {
    const style = StyleSheet.flatten(
      heightSourceStyle.find((item) => StyleSheet.flatten(item).height)
    );
    const height = style?.height ? style.height.toString() : '-1';
    return Number.parseFloat(height);
  }, [heightSourceStyle]);

  const getWidth = useCallback(() => {
    const style = StyleSheet.flatten(
      widthSourceStyle.find((item) => StyleSheet.flatten(item).width)
    );
    const width = style?.width ? style.width.toString() : '-1';
    return Number.parseFloat(width);
  }, [widthSourceStyle]);

  return {
    getHeight,
    getWidth,
  };
};

const SplitLine = () => {
  return <View style={styles.splitLint} />;
};

function Component<ItemT>(
  {
    defaultIndex,
    defaultLabel = 'Please select',
    index,
    onSelect = truth,
    dataSource,
    disabled = false,
    loading = false,
    animated = true,
    transitionShow = 'flipUp',
    transitionHide = 'flipDown',
    scrollEnabled = true,
    keyExtractor = (_, itemIndex) => itemIndex.toString(),
    adjustFrame = id,
    renderItem,
    renderSeparator = SplitLine,
    showSeparator = true,
    renderLabel,
    onDropdownWillShow = truth,
    onDropdownWillHide = truth,

    rootContainerStyle = {},
    rootContainerProps = {},
    labelContainerStyle = {},
    labelContainerDisabledStyle = {},
    labelContainerProps = {},
    labelStyle = {},
    labelDisabledStyle = {},
    labelProps = {},
    modalProps = {},
    dropdownStyle = {},
    dropdownProps = {},
    itemTouchableProps = {},
    itemLabelStyle = {},
    itemLabelProps = {},
    itemLabelHighlightStyle = {},
    children,
  }: Props<ItemT>,
  ref: React.Ref<any>
) {
  const _button = useRef<TouchableOpacity>(null);
  const _buttonFrame = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    return isNumber(index) ? index : isNumber(defaultIndex) ? defaultIndex : -1;
  });

  const dropDownSize = usePosition({
    heightSourceStyle: [rootContainerStyle, dropdownStyle, styles.dropdown],
    widthSourceStyle: [rootContainerStyle, dropdownStyle, rootContainerStyle],
  });

  const {
    style: dropdownAnimatedStyle,
    visible: _dropdownVisibleForAnimation,
  } = useAnimation({
    visible: dropdownVisible,
    transitionHide,
    transitionShow,
    meta: {
      dropdownHeight: dropDownSize.getHeight(),
      dropdownWidth: dropDownSize.getWidth(),
    },
  });

  const labelText = useMemo(() => {
    return renderLabel
      ? renderLabel(dataSource[selectedIndex], selectedIndex)
      : dataSource[selectedIndex]
      ? dataSource[selectedIndex]
      : defaultLabel;
  }, [dataSource, defaultLabel, renderLabel, selectedIndex]);

  useEffectWithSkipFirst(() => {
    if (isNumber(index)) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(-1);
    }
  }, [index]);

  const hide = () => {
    setDropdownVisible(false);
  };

  const show = () => {
    setDropdownVisible(true);
  };

  const select = (newIndex: number) => {
    setSelectedIndex(newIndex);
    onSelect(newIndex);
  };

  useImperativeHandle(ref, () => ({
    select,
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
    if (
      onDropdownWillHide(dataSource[selectedIndex], selectedIndex) !== false
    ) {
      hide();
    }
  };

  const _onModalPress = () => {
    if (
      onDropdownWillHide(dataSource[selectedIndex], selectedIndex) !== false
    ) {
      hide();
    }
  };

  const _onLabelPress = () => {
    if (
      onDropdownWillShow(dataSource[selectedIndex], selectedIndex) !== false
    ) {
      show();
    }
  };

  const _onPressModalItem = (newIndex: number, item: ItemT) => {
    // 除非是 false 否则更新 index
    if (onSelect(newIndex, item) !== false) {
      setSelectedIndex(newIndex);
    }
    if (onDropdownWillHide(dataSource[newIndex], newIndex) !== false) {
      setDropdownVisible(false);
    }
  };

  const getDropdownHorizontalBorderWidthFromStyle = useCallback(() => {
    const style: ViewStyle = StyleSheet.flatten([
      dropdownStyle,
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
  }, [rootContainerStyle, dropdownStyle]);

  const _calcPosition = () => {
    // 首先根据 style 的对象获取 dropdown 容器的高度
    const dropdownHeight = dropDownSize.getHeight();

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
      const dropdownWidth = dropDownSize.getWidth();
      if (dropdownWidth !== -1) {
        positionStyle.width = dropdownWidth;
      }
      positionStyle.right = rightSpace - w;
    }

    return adjustFrame(positionStyle);
  };

  const _renderLoading = () => {
    return <ActivityIndicator size="small" />;
  };

  const _renderLabel = () => {
    return (
      <TouchableOpacity
        ref={_button}
        disabled={disabled}
        onPress={_onLabelPress}
        style={[
          labelContainerStyle,
          disabled && styles.labelContainerDisabled,
          disabled && labelContainerDisabledStyle,
        ]}
        {...labelContainerProps}
      >
        {children ?? (
          <Text
            style={[
              styles.label,
              labelStyle,
              disabled && styles.labelDisabled,
              disabled && labelDisabledStyle,
            ]}
            numberOfLines={1}
            {...labelProps}
          >
            {labelText}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const _renderItem = ({
    index: newIndex,
    item,
  }: ListRenderItemInfo<ItemT>) => {
    const highlighted = newIndex === selectedIndex;

    const row = renderItem ? (
      renderItem(item, newIndex, highlighted)
    ) : (
      <Text
        style={[
          styles.dropdownTextStyle,
          itemLabelStyle,
          highlighted && styles.highlightedRowText,
          highlighted && itemLabelHighlightStyle,
        ]}
        {...itemLabelProps}
      >
        {item}
      </Text>
    );

    const preservedProps = {
      onPress: () => _onPressModalItem(newIndex, item),
      ...itemTouchableProps,
    };

    if (TOUCHABLE_ELEMENTS.find((name) => name === row.type.displayName)) {
      const props = {
        ...row.props,
        onPress: preservedProps.onPress,
      };

      const { children: realChildren } = row.props;
      switch (row.type.displayName) {
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
        // TODO react native web not support TouchableNativeFeedback
        case 'TouchableNativeFeedback': {
          console.warn('react native web not support TouchableNativeFeedback');
          return (
            <TouchableNativeFeedback {...props}>{row}</TouchableNativeFeedback>
          );
        }
        default:
          break;
      }
    }

    return <TouchableHighlight {...preservedProps}>{row}</TouchableHighlight>;
  };

  const _renderDropdown = () => {
    const _dropdownStyle: ViewStyle = StyleSheet.flatten([
      dropdownStyle,
      {
        width: dropDownSize.getWidth(),
        height: dropDownSize.getHeight(),
      },
    ]);
    const _dropdownWidth = Number.parseFloat(
      _dropdownStyle.width?.toString() ?? '-1'
    );

    return (
      <FlatList
        scrollEnabled={scrollEnabled}
        style={[
          _dropdownStyle,
          _dropdownWidth !== -1 && {
            width: _dropdownWidth - getDropdownHorizontalBorderWidthFromStyle(),
          },
        ]}
        data={dataSource}
        renderItem={_renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={showSeparator ? renderSeparator : null}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        {...dropdownProps}
      />
    );
  };

  const _renderModel = () => {
    const frameStyle = _calcPosition();

    return (
      <Modal
        animated={animated}
        animationType={'none'}
        visible={_dropdownVisibleForAnimation}
        transparent={true}
        onRequestClose={_onRequestClose}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
        {...modalProps}
      >
        <TouchableWithoutFeedback
          disabled={!dropdownVisible}
          onPress={_onModalPress}
        >
          <View style={styles.modal}>
            <Animated.View
              style={[
                styles.dropdown,
                dropdownStyle,
                frameStyle,
                animated && dropdownAnimatedStyle,
              ]}
            >
              {loading ? _renderLoading() : _renderDropdown()}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View
      onLayout={onLayout}
      style={rootContainerStyle}
      {...rootContainerProps}
    >
      {_renderLabel()}
      {_renderModel()}
    </View>
  );
}

export default React.forwardRef(Component) as <T>(
  p: Props<T> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
  modal: {
    flexGrow: 1,
  },
  dropdown: {
    position: 'absolute',
    height: (33 + StyleSheet.hairlineWidth) * 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  loading: {
    alignSelf: 'center',
  },
  dropdownTextStyle: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 11,
    color: 'rgba(0,0,0,.65)',
    backgroundColor: 'white',
    textAlignVertical: 'center',
  },
  highlightedRowText: {
    color: 'black',
  },
  highlightedRow: {
    backgroundColor: '#f5f5f5',
  },
  labelDisabled: {
    color: 'rgba(0,0,0,.25)',
  },
  labelContainerDisabled: {
    backgroundColor: '#fff',
  },
  splitLint: {
    backgroundColor: 'rgb(217, 217, 217)',
    height: 1,
    width: '100%',
  },
});
