import type {
  FlatListProps,
  StyleProp,
  TextProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type { ModalProps } from 'react-native-modal';
import { ModalHideReason, ModalShowReason } from "./reasons";
import { GestureResponderEvent } from "react-native";

export type Position = {
  top: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type Animations = {
  transitionShow: 'flipUp' | 'scaleIn' | 'fadeIn' | 'slideUp';
  transitionHide: 'flipDown' | 'scaleOut' | 'fadeOut' | 'slideDown';
};

export type UseAnimationContext = {
  triggerWidth: number;
  triggerHeight: number;
};

export type UseAnimationProps = {
  visible: boolean;
  transitionShow: Animations['transitionShow'];
  transitionHide: Animations['transitionHide'];
  getContext: () => UseAnimationContext;
};

export type DropdownFlatListProps<ItemT extends string | number> = {
  // 默认高亮的索引
  defaultIndex?: number;
  // 被选中的索引（受控）
  index?: number;
  // 点击 item 后触发的回调
  onItemPress?: (info: { index: number, item?: ItemT }) => boolean | void | undefined;
  // 仅在传入 index 时生效选择某个元素后触发
  // 注意: 如果元素已被选中, 该回调不会触发, 而是触发 onAntiSelect, 这对于需要反选的场景很有效, 如果你只想处理点击事件, 那么请使用 onItemPress
  onSelect?: (info: { index: number, item?: ItemT }) => boolean | void | undefined;
  // 仅在传入 index 时生效反选某个元素后触发
  // 注意: 如果元素未被选中, 该回调不会触发, 而是触发 onSelect, 这对于需要反选的场景很有效, 如果你只想处理点击事件, 那么请使用 onItemPress
  onAntiSelect?: (info: { index: number, item?: ItemT }) => boolean | void | undefined;
  // 数据源
  data: ReadonlyArray<ItemT>;
  // 自定义渲染
  renderItem?: (info: {
    item: ItemT;
    index: number;
    isActive: boolean;
  }) => JSX.Element;
} & Omit<FlatListProps<ItemT>,
  'data' | 'renderItem'>;

export type DropdownFlatListItemProps = {
  item: string | number;
  // 是否处于选中状态
  isActive?: boolean,
  // 选中状态下的 item 的样式
  activeStyle?: StyleProp<ViewStyle>;
} & Omit<TextProps, 'children'>;

export type Props<ItemT> = {
  // 是否显示
  visible?: boolean;
  // 是否禁止点击 label 弹出 dropdown
  disabled?: boolean;
  // 是否启动 dropdown 动画
  animated?: boolean;
  // 显示时的动画效果
  transitionShow?: Animations['transitionShow'];
  // 隐藏式的动画效果
  transitionHide?: Animations['transitionHide'];

  // 每次更新 Modal 位置之前触发的回调函数，如果需要自定义 Modal 位置，则返回符合 Position 类型的对象即可
  adjustFrame?: (position: Position) => Position;

  // 触发在 dropdown 显示之前，如果返回 false 则不显示 dropdown
  onModalWillShow?: (reason: ModalShowReason) => boolean | void;
  // 触发在 dropdown 关闭之前，如果返回 false 则不关闭 dropdown
  onModalWillHide?: (reason: ModalHideReason) => boolean | void;

  // 自定义任何样式/属性！！！

  // 根容器相关
  // 根容器的样式
  dropdownProps?: Omit<ViewProps, 'style'>;
  dropdownStyle?: StyleProp<ViewStyle>;

  // Modal 相关
  modalProps?: Partial<Omit<ModalProps, 'isVisible' | 'onBackButtonPress' | 'children' | 'animationIn' | 'animationOut' | 'animationInTiming' | 'animationOutTiming'>>;

  // 包裹 item 的 touchable 的 props
  itemTouchableProps?: Omit<| TouchableOpacityProps
    | TouchableHighlightProps
    | TouchableNativeFeedbackProps
    | TouchableWithoutFeedbackProps,
    'onPress'>;

  // 触发 Dropdown 的元素
  Trigger: ((props: { onPress: (event: GestureResponderEvent) => void }) => JSX.Element) | string;
  // 触发 Dropdown 后弹出的元素
  Overlay: JSX.Element | JSX.Element[];
};

export type Handles = {
  hide: () => void;
  show: () => void;
};
