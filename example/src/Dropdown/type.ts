import type { FlatListProps, GestureResponderEvent, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';
import type { ModalProps } from 'react-native-modal';
import type { ModalHideReason, ModalShowReason } from "./enums";
import type { ReactNode } from "react";

export type ModalDropdownContextType = {
  // 如果传入 safeArea 则尝试计算相较于 trigger 的安全区域
  // left: 从 trigger 左侧到屏幕可视区域左侧的位置
  // right: 从 trigger 左侧到可视区域右侧的位置
  // bottom: 从 trigger 左侧到可视区域底部的位置
  // top: 从 trigger 顶部到可视区域顶部的位置

  // trigger 自身的尺寸
  triggerBounds: Bounds,
  overlayBounds: Bounds,
  // 可视区域, 该参数一般通过 safeArea 相关的库获取, 例如 https://github.com/th3rdwave/react-native-safe-area-context#usesafeareainsets
  safeArea?: EdgeInsets,
  // 准备关闭 overlay
  onRequestClose: () => void
  // 显示 overlay
  show: () => void
  // 隐藏 overlay
  hide: () => void
  // 当前 overlay 是否可见
  visible: boolean
}

export type AnimationExecute = (params: { overlayBounds: Bounds, triggerBounds: Bounds, transitionShow: ModalDropdownAnimations['transitionShow'], transitionHide: ModalDropdownAnimations['transitionHide'] }) => Promise<void>

// 相对于左上角的位置和大小
export type EdgeInsets = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

// 相对于左上角的位置和大小
export type Bounds = {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

// 宽高
export type Size = {
  width: number;
  height: number;
};

export type ModalDropdownAnimations = {
  transitionShow: 'flipUp' | 'scaleIn' | 'fadeIn' | 'slideUp';
  transitionHide: 'flipDown' | 'scaleOut' | 'fadeOut' | 'slideDown';
};

export type UseAnimationParameters = {
  visible: boolean;
  transitionShow: ModalDropdownAnimations['transitionShow'];
  transitionHide: ModalDropdownAnimations['transitionHide'];
  overlayBounds: Bounds
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

export type ModalDropdownProps = {
  // 可视区域, 该参数一般通过 safeArea 相关的库获取, 例如 https://github.com/th3rdwave/react-native-safe-area-context#usesafeareainsets
  safeArea?: EdgeInsets
  // 是否显示
  visible?: boolean;
  // 是否启动 dropdown 动画
  animated?: boolean;
  // 显示时的动画效果
  transitionShow?: ModalDropdownAnimations['transitionShow'];
  // 隐藏式的动画效果
  transitionHide?: ModalDropdownAnimations['transitionHide'];

  // 每次更新 Modal 位置之前触发的回调函数，如果需要自定义 Modal 位置，则返回符合 Position 类型的对象即可
  adjustFrame?: (position: EdgeInsets) => EdgeInsets;

  // 触发在 dropdown 显示之前，如果返回 false 则不显示 dropdown
  onModalWillShow?: (reason: ModalShowReason) => boolean | void;
  // 触发在 dropdown 关闭之前，如果返回 false 则不隐藏 dropdown
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

export type ModalDropdownHandles = {
  hide: () => void;
  show: () => void;
};
