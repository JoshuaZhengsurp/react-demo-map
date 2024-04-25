/**
 * 主要用于初始化计算
 */

// 计算画板的左上角坐标,以及宽高
export function computeBoardRect(canvas: HTMLCanvasElement) {
  const boardRect: DOMRect = canvas.getBoundingClientRect();
  const domRect: DOMRect = document.documentElement.getBoundingClientRect();
  return computeBoardRectSize(boardRect, domRect);
}

// 相对于父盒子left和top
export function computeBoardRectSize(boardRect: DOMRect, domRect: DOMRect) {
  const { width, height, left: boardLeft, top: boardTop } = boardRect;
  const { left: domLeft, top: domTop } = domRect;
  const left = boardLeft - domLeft;
  const top = boardTop - domTop;
  return { left, top, width, height };
}
