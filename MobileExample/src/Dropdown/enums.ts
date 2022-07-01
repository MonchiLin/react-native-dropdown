export enum ModalShowReason {
  // 通过 ref.current.show 手动显示
  WithRef = 'WithRef',
  // 可见性改变
  VisibleStateChange = 'VisibleStateChange',
  // 点击 Trigger
  ClickTrigger = 'ClickTrigger',
}

export enum ModalHideReason {
  // 通过 ref.current.hide 手动隐藏
  WithRef = 'WithRef',
  // 可见性改变
  VisibleStateChange = 'VisibleStateChange',
  // 点击返回按钮
  ClickBackButton = 'ClickBackButton',
  // 点击 Overlay 内部
  ClickOverlayOutside = 'ClickOverlayOutside',
  // 点击 Overlay 外部
  ClickOverlayInside = 'ClickOverlayInside',
}

export enum OverlayStrategy {
  // 初始值, 用于 Unmounted 的区别在于, Unmounted 表示显示过一次, 这意味有些数据可以使用缓存
  None = 'None',
  // 测量 Overlay 的尺寸和最终要显示的位置
  Measure = 'Measure',
  // 即将要显示在屏幕上, 开始执行 overlay 显示的过渡动画
  BeforeMounted = 'BeforeMounted',
  // 已经显示在屏幕上
  Mounted = 'Mounted',
  // 即将从屏幕上移除, 开始执行 overlay 隐藏的过渡动画
  BeforeUnmounted = 'BeforeUnmounted',
  // 未挂载
  Unmounted = 'Unmounted',
}
