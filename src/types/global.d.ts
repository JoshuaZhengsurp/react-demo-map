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

  // 画板参数
  interface BoardRect extends RectSize {
    left: number;
    top: number;
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
