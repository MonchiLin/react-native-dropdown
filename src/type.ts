import {
  FlatListProps,
  ModalProps,
  StyleProp,
  TextProps,
  TextStyle,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  ViewProps,
  ViewStyle,
} from 'react-native';

export type Position = {
  width?: number;
  height: number;
  top: number;
  left?: number;
  right?: number;
};

export type Animations = {
  transitionShow: 'flipUp' | 'scaleIn' | 'fadeIn' | 'slideUp';
  transitionHide: 'flipDown' | 'scaleOut' | 'fadeOut' | 'slideDown';
};

export type UsePositionProps = {
  heightSourceStyle: StyleProp<ViewStyle>[];
  widthSourceStyle: StyleProp<ViewStyle>[];
};

export type UseAnimationPropsMeta = {
  dropdownWidth: number;
  dropdownHeight: number;
};

export type UseAnimationProps = {
  visible: boolean;
  transitionShow: Animations['transitionShow'];
  transitionHide: Animations['transitionHide'];
  meta: UseAnimationPropsMeta;
};

export type Props<ItemT> = {
  // 常用 props
  // 默认高亮的索引
  defaultIndex?: number;
  // 默认 label
  defaultLabel?: string;
  // 被选中的索引（受控）
  index?: number;
  // 点击 item 后触发的回调
  onSelect?: (index: number, item?: ItemT) => boolean | void | undefined;
  // 数据源
  dataSource: ReadonlyArray<ItemT>;
  // 是否禁止点击 label 弹出 dropdown
  disabled?: boolean;
  // 是否正在加载
  loading?: boolean;
  // 是否启动 dropdown 动画
  animated?: boolean;
  transitionShow?: Animations['transitionShow'];
  transitionHide?: Animations['transitionHide'];
  // 是否允许 dropdown 滚动
  scrollEnabled?: boolean;
  keyExtractor?: (item: ItemT, index: number) => string;

  // 每次更新 Modal 位置之前触发的回调函数，如果需要自定义 Modal 位置，则返回符合 Position 类型的对象即可
  adjustFrame?: (position: Position) => Position;
  // 自定义渲染 Item - !!!! NOTICE: 一旦使用 renderItem 则以下 prop 不会生效
  // itemStyle
  // itemProps
  // itemLabelStyle
  // itemLabelProps
  // itemHighlightStyle
  // itemLabelHighlightStyle
  renderItem?: (item: ItemT, index: number, isActive: boolean) => JSX.Element;
  // 自定义分割线
  renderSeparator?: (separator: {
    highlighted: string;
    leadingItem: ItemT;
  }) => JSX.Element | null;
  // 是否显示分割线
  showSeparator?: boolean;
  // 自定义渲染 label - !!!! NOTICE: 一旦使用 renderItem 则 labelStyle 与 labelProps 不会生效
  renderLabel?: (item?: ItemT, index?: number) => string;

  // 触发在 dropdown 显示之前，如果返回 false 则不显示 dropdown
  onDropdownWillShow?: (item: ItemT, index: number) => boolean | void;
  // 触发在 dropdown 关闭之前，如果返回 false 则不关闭 dropdown
  onDropdownWillHide?: (item: ItemT, index: number) => boolean | void;

  // 自定义任何样式/属性！！！

  // 根容器相关
  // 根容器的样式
  rootContainerStyle?: StyleProp<ViewStyle>;
  rootContainerProps?: Omit<ViewProps, 'style'>;

  labelContainerDisabledStyle?: StyleProp<ViewStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelContainerProps?: Omit<
    TouchableOpacityProps,
    'ref' | 'disabled' | 'onPress'
  >;

  // label 相关
  labelStyle?: StyleProp<TextStyle>;
  labelDisabledStyle?: StyleProp<TextStyle>;
  labelProps?: Omit<TextProps, 'style'>;

  // Modal 相关
  modalProps?: Omit<
    ModalProps,
    'visible' | 'animated' | 'transparent' | 'onRequestClose'
  >;

  // dropdown 相关
  dropdownStyle?: StyleProp<ViewStyle>;
  dropdownProps?: Omit<
    FlatListProps<ItemT>,
    | 'data'
    | 'style'
    | 'scrollEnabled'
    | 'renderItem'
    | 'ItemSeparatorComponent'
    | 'keyExtractor'
  >;

  // 包裹 item 的 touchable 的 props
  itemTouchableProps?: Omit<
    | TouchableOpacityProps
    | TouchableHighlightProps
    | TouchableNativeFeedbackProps
    | TouchableWithoutFeedbackProps,
    'onPress'
  >;

  // item label 的样式
  itemLabelStyle?: StyleProp<TextStyle>;
  // itemLabel 的 props
  itemLabelProps?: Omit<TextProps, 'style'>;
  // 被高亮的 item 的样式
  itemHighlightStyle?: StyleProp<ViewStyle>;
  // 被高亮的 item label 的样式
  itemLabelHighlightStyle?: StyleProp<TextStyle>;

  children?: JSX.Element | JSX.Element[];
};

export type DropdownHandles = {
  select: (index: number) => void;
  hide: () => void;
  show: () => void;
};
