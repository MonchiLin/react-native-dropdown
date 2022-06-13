import React from "react";
import { id } from "./internal/utils";
import { Position } from "./type";

type Context = {
  // trigger 本身的大小
  triggerSize: { height: number, width: number },
  // 相较于 trigger 的安全区域
  // left: 从 trigger 左侧到屏幕可视区域左侧的位置
  // right: 从 trigger 左侧到可视区域右侧的位置
  // bottom: 从 trigger 左侧到可视区域底部的位置
  // top: 从 trigger 顶部到可视区域顶部的位置
  safeSize: Position,
  // 可视区域, 这个大小一般通过 safe-area 相关的库获取, 例如 https://github.com/th3rdwave/react-native-safe-area-context#usesafeareainsets
  safeArea?: Position,
  onRequestClose: () => void
  show: () => void
  hide: () => void
  visible: boolean
}

const ModalDropdownContext = React.createContext<Context>({
    triggerSize: { height: 0, width: 0 },
    onRequestClose: id,
    show: id,
    hide: id,
    visible: false,
    safeSize: { left: 0, right: 0, bottom: 0, top: 0 },
    // safeArea: { left: 0, right: 0, bottom: 0, top: 0 },
    safeArea: undefined,
  },
);

export const ModalDropdownProvider = ModalDropdownContext.Provider;

export const useModalDropdownContext = () => {
  const context = React.useContext(ModalDropdownContext);

  return context;
};
