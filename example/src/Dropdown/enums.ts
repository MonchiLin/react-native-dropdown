export enum ModalShowReason {
  // 通过 ref.current.show 手动显示
  WithRef = "WithRef",
  // 可见性改变
  VisibleStateChange = "VisibleStateChange",
  // 点击 Trigger
  ClickTrigger = "ClickTrigger"
}

export enum ModalHideReason {
  // 通过 ref.current.hide 手动隐藏
  WithRef = "WithRef",
  // 可见性改变
  VisibleStateChange = "VisibleStateChange",
  // 点击返回按钮
  ClickBackButton = "ClickBackButton",
  // 点击 Overlay 内部
  ClickOverlayOutside = "ClickOverlayOutside",
  // 点击 Overlay 外部
  ClickOverlayInside = "ClickOverlayInside"
}

export enum ModalDropdownStrategy {
  // 测量
  Measure= "Measure",
  // 渲染
  Render= "Render",
  // 从 v-dom 中移除之前
  BeforeUnmounted= "BeforeUnmounted",
  // 未挂载
  Unmounted= "Unmounted",
}
