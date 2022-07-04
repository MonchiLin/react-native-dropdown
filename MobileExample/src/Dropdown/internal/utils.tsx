import type { Bounds, EdgeInsets, ModalDropdownPlacement, Size } from "../type";

export const truth = () => true;
export const isNumber = (o: unknown): o is number => typeof o === 'number';

export function id<T>(v?: T): T {
  return v;
}

export function setImmediatePromise() {
  return new Promise((resolve) => {
    setImmediate(resolve);
  });
}

export namespace PositionJudge {

  export const judge = ({
                   triggerBounds,
                   placement,
                   windowSize,
                   overlayBounds,
                   safeArea,
                 }: {
    placement: ModalDropdownPlacement,
    triggerBounds: Bounds,
    overlayBounds: Bounds,
    windowSize: Size,
    safeArea: EdgeInsets,
  }): EdgeInsets => {

    // x: trigger 的 x 点（相对于屏幕左上角）
    // y: trigger 的 y 点（相对于屏幕左上角）
    // w: trigger 的宽度
    // h: trigger 的高度
    const { x, y, w, h } = triggerBounds;

    let position: EdgeInsets;

    const showInTop = () => {
      position = {
        bottom: windowSize.height - y,
        left: x,
      }
    }

    const showInBottom = () => {
      position = {
        top: y + h,
        left: x,
      }
    }

    const showInLeft = () => {
      position = {
        top: y,
        right: x,
      }
    }

    const showInRight = () => {
      position = {
        top: y,
        left: x + w,
      }
    }

    switch (placement) {
      case "bottom":
        // 距离底部的空间
        const buttonSpace = windowSize.height - y - h;
        // trigger 下方是否有足够的空间显示 overlay
        const bottomHasArea = buttonSpace >= overlayBounds.h;

        if (bottomHasArea) {
          showInBottom()
        } else {
          console.warn("[ModalDropdown] not enough space to show in bottom, fallback to top");
          showInTop()
        }
        break
      case "top":
        // 距离顶部的空间
        const topSpace = windowSize.height - y;
        // trigger 上方是否有足够的空间显示 overlay
        const topHasArea = topSpace >= overlayBounds.h;

        if (topHasArea) {
          showInBottom()
        } else {
          console.warn("[ModalDropdown] not enough space to show in top, fallback to bottom");
          showInTop()
        }
        break
      case "left":
        // 距离左边的空间
        const leftSpace = windowSize.width - x;
        // trigger 上方是否有足够的空间显示 overlay
        const leftHasArea = leftSpace >= overlayBounds.w;

        if (leftHasArea) {
          showInLeft()
        } else {
          console.warn("[ModalDropdown] not enough space to show in left, fallback to right");
          showInRight()
        }
        break
      case "right":
        // 距离右边的空间
        const rightSpace = windowSize.width - x - triggerBounds.w;
        // trigger 上方是否有足够的空间显示 overlay
        const rightHasArea = rightSpace >= overlayBounds.w;

        if (rightHasArea) {
          showInRight()
        } else {
          console.warn("[ModalDropdown] not enough space to show in right, fallback to left");
          showInLeft()
        }
        break
    }

    return position;
  };

}
