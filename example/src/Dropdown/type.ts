import type { FlatListProps, GestureResponderEvent, StyleProp, ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { ModalProps } from 'react-native-modal';
import type { ModalHideReason, ModalShowReason } from "./reasons";
import type { ReactNode } from "react";

export type Position = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type Frame = {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Animations = {
  transitionShow: 'flipUp' | 'scaleIn' | 'fadeIn' | 'slideUp';
  transitionHide: 'flipDown' | 'scaleOut' | 'fadeOut' | 'slideDown';
};

export type UseAnimationParams = {
  visible: boolean;
  transitionShow: Animations['transitionShow'];
  transitionHide: Animations['transitionHide'];
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
  label: string | number;
  // 是否处于选中状态
  isActive?: boolean,
  // 容器样式
  contentContainerStyle?: StyleProp<ViewStyle>,
  // 选中状态下容器样式
  activeContentContainerStyle?: StyleProp<ViewStyle>;
  // label 样式
  labelStyle?: StyleProp<TextStyle>;
  // 选中状态下 label 样式
  activeLabelStyle?: StyleProp<TextStyle>;
  // 点击事件
  onPress: (event: GestureResponderEvent) => void
};

type DropdownButtonPropsBase = {
  contentContainerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
}

export type DropdownButtonProps = DropdownButtonPropsBase
  & (
  { label: string, Icon?: ReactNode, labelStyle?: StyleProp<TextStyle> }
  | { children: ReactNode }
  )

export type ModalDropdownPlacement =
  "bottomLeft"
  | "bottomCenter"
  | "bottomRight"
  | "topLeft"
  | "topCenter"
  | "topRight"

export type Props<ItemT> = {
  // 是否显示
  visible?: boolean;
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

  // 位置
  placement?: ModalDropdownPlacement

  // 根容器相关
  // 根容器的样式
  dropdownProps?: Omit<ViewProps, 'style'>;
  dropdownStyle?: StyleProp<ViewStyle>;

  // Modal 相关
  modalProps?: Partial<Omit<ModalProps, 'isVisible' | 'onBackButtonPress' | 'children' | 'animationIn' | 'animationOut' | 'animationInTiming' | 'animationOutTiming'>>;

  // 触发 Dropdown 的元素
  Trigger: ReactNode | string;
  // 触发 Dropdown 后弹出的元素
  Overlay: JSX.Element | JSX.Element[];
};

export type Handles = {
  hide: () => void;
  show: () => void;
};