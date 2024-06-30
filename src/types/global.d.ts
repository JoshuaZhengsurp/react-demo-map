export {};
declare global {
  type CsRdCx2d = CanvasRenderingContext2D;

  interface Matting {
    picFile: File | null;
    isErasing: boolean;
    radius: number;
    hardness: number;
    [propName: string]: any;
  }

  interface MattingProps extends Matting {}

  // 交换配置参数
  interface TransformConfig {
    positionRange: PositionRange;
    scaleRatio: number;
  }

  /** 矩形的尺寸 */
  export interface RectSize {
    width: number;
    height: number;
  }

  /**
   * 导航视窗区域内图片默认尺寸：以图片中心点为原点，进行等比例缩放
   * 图片上下边距至少各留80px，左右边距至少留白40px，上下边距优先级高于左右边距
   * 例如：当图片上下留白80px时，左右留白大于40px时，以上下留白80px为准
  */
  export interface GapSize {
    horizontal: number;
    vertical: number;
  }

  // 画板参数
  interface BoardRect extends RectSize {
    left: number;
    top: number;
  }

  /** 绘制位置范围 */
  interface PositionRange {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }

  /** 画板绘制上下文对象 */
  interface BoardContext2Ds {
    /** 输入画板绘制上下文 */
    inputCtx: CanvasRenderingContext2D | null;
    /** 输出画板绘制上下文 */
    outputCtx: CanvasRenderingContext2D | null;
    inputDrawingCtx: CanvasRenderingContext2D;
    outputDrawingCtx: CanvasRenderingContext2D;
    /** 绘制输入图像的隐藏画板的绘制上下文 */
    inputHiddenCtx: CanvasRenderingContext2D;
    /** 绘制输出图像的隐藏画板的绘制上下文 */
    outputHiddenCtx: CanvasRenderingContext2D;
  }
}
