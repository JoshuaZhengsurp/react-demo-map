import {
  GRADIENT_BEGIN_OFFSET,
  GRADIENT_END_OFFSET,
  GRADIENT_INNER_RADIUS,
  REPAIR_POINT_INNER_COLOR,
  REPAIR_POINT_OUTER_COLOR,
} from "@/const";

// 绘制画笔原点
export function drawBrushPoint(drawingConfig: DrawingCircularConfig) {
  const { ctx, x, y, radius, hardness } = drawingConfig;
  const {
    innerColor = REPAIR_POINT_INNER_COLOR,
    outerColor = REPAIR_POINT_OUTER_COLOR,
  } = drawingConfig;
  ctx.beginPath();
  // 根据参数确定两个圆的坐标，绘制放射性渐变的方法
  const gradient = ctx.createRadialGradient(
    x,
    y,
    GRADIENT_INNER_RADIUS,
    x,
    y,
    radius
  );
  gradient.addColorStop(GRADIENT_BEGIN_OFFSET, innerColor);
  gradient.addColorStop(hardness, innerColor);
  gradient.addColorStop(GRADIENT_END_OFFSET, outerColor);
  ctx.fillStyle = gradient;
  // 圆心x轴坐标,圆心y轴坐标,半径, 起点弧度,结束点弧度
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// 获取位图图像
export async function getLoadedImage(picFile: File | string) {
  const img = new Image();
  img.crossOrigin = "anoymous";
  img.src =
    typeof picFile === "string" ? picFile : URL.createObjectURL(picFile);
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });
  //创建位图
  return createImageBitmap(img);
}

// 创建2dctx
export function createContext2D(createConfig: CreateContext2DConfig = {}) {
  const { targetSize, cloneCanvas } = createConfig;
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx2D: CsRdCx2d = canvas.getContext("2d") as CsRdCx2d;
  if (targetSize) {
    canvas.width = targetSize.width;
    canvas.height = targetSize.height;
  }
  if (cloneCanvas) {
    copyImageInCanvas(ctx2D, cloneCanvas);
  }
  return ctx2D;
}

export function copyImageInCanvas(
  hiddenContext: CsRdCx2d,
  cloneCanvas: HTMLCanvasElement
) {
  hiddenContext.canvas.width = cloneCanvas.width;
  hiddenContext.canvas.height = cloneCanvas.height;
  // 绘制图像
  hiddenContext.drawImage(cloneCanvas, 0, 0);
}
