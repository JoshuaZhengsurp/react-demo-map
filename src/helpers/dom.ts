import {
  GRADIENT_BEGIN_OFFSET,
  GRADIENT_END_OFFSET,
  GRADIENT_INNER_RADIUS,
  REPAIR_POINT_INNER_COLOR,
  REPAIR_POINT_OUTER_COLOR,
  DEFALUT_IMAGE_SHOOTH_CHOICE,
  IMAGE_BORDER_STYLE,
  IMAGE_BORDER_WIDTH,
} from "@/const";

/**
 * 对使用的dom节点进行操作
 */

export function resizeCanvas(config: ResizeCanvasConfig) {
  const {
    ctx,
    hiddenCtx,
    targetHeight,
    targetWidth,
    transformConfig,
    withBorder = false,
  } = config;
  const { positionRange, scaleRatio } = transformConfig;
  ctx.canvas.width = targetWidth;
  ctx.canvas.height = targetHeight;
  // 绘制图像时是否平滑处理(缩放导致像素失帧), 插值处理, 使得图像更光滑, 默认false
  ctx.imageSmoothingEnabled = DEFALUT_IMAGE_SHOOTH_CHOICE;
  drawImageWithTransform({
    ctx,
    hiddenCtx,
    withBorder,
    positionRange,
    scaleRatio,
    clearOld: false,
  });
}

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
  img.crossOrigin = "anonymous";
  img.src =
    typeof picFile === "string" ? picFile : URL.createObjectURL(picFile);
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });
  //创建位图
  return createImageBitmap(img);
}

// 创建2d的canvas上下文
export function createContext2D(createConfig: CreateContext2DConfig = {}) {
  const { targetSize, cloneCanvas } = createConfig;
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx2D = canvas.getContext("2d") as CanvasRenderingContext2D;
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

export function drawImageWithTransform(
  transformedConfig: TransformedDrawingImageConfig
) {
  const { ctx, positionRange, scaleRatio, hiddenCtx } = transformedConfig;
  const { clearOld = true, withBorder } = transformedConfig;

  const { minY, minX } = positionRange;
  if (clearOld) {
    clearCanvas(ctx);
  }
  ctx.save();
  ctx.translate(minX, minY);
  ctx.scale(scaleRatio, scaleRatio);
  ctx.drawImage(hiddenCtx.canvas, 0, 0);
  if (withBorder) {
    drawBoaderImageBorder(ctx, hiddenCtx);
  }
  ctx.restore();
}

export function drawBoaderImageBorder(
  ctx: CanvasRenderingContext2D,
  hiddenCtx: CanvasRenderingContext2D
) {
  const { width, height } = hiddenCtx.canvas;
  const positionRange: PositionRange = {
    minX: 0,
    minY: 0,
    maxX: width,
    maxY: height,
  };
  const drawBorder = ({
    ctx,
    positionRange,
    lineStyle = IMAGE_BORDER_STYLE,
    lineWidth = IMAGE_BORDER_WIDTH,
  }: DrawImageLineBorderConfig) => {
    const { minX: left, minY: right, maxX: top, maxY: bottom } = positionRange;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = lineStyle;
    ctx.fillRect(left, top, right - left + lineWidth, lineWidth);
    ctx.fillRect(left, bottom, right - left + lineWidth, lineWidth);
    ctx.fillRect(left, top + lineWidth, lineWidth, bottom - top - lineWidth);
    ctx.fillRect(right, top + lineWidth, lineWidth, bottom - top - lineWidth);
    ctx.imageSmoothingEnabled = DEFALUT_IMAGE_SHOOTH_CHOICE;
  };
  drawBorder({ ctx, positionRange });
}

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  const {
    canvas: { width, height },
  } = ctx;
  ctx.clearRect(0, 0, width, height);
}
