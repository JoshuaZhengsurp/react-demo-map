export {};
declare global {
  // 修改画布尺寸配置
  interface ResizeCanvasConfig extends InitTransformedDrawBaseConfig {
    /** canvas 2D上下文 */
    ctx: CanvasRenderingContext2D;
    hiddenCtx: CanvasRenderingContext2D;
    /** 尺寸重置的目标宽度 */
    targetWidth: number;
    /** 尺寸重置的目标高度 */
    targetHeight: number;
  }

  // 初始化变换参数, 用于实际图像渲染
  interface InitTransformedDrawBaseConfig {
    /** 变换配置 */
    transformConfig: TransformConfig;
    /** 是否绘制图像边框 */
    withBorder?: boolean;
  }

  interface TransformedDrawingImageConfig
    extends DrawingContext,
      TransformConfig {
    clearOld?: boolean;
    withBorder?: boolean;
  }

  // 画板变换时,
  interface DrawingContext {
    ctx: CanvasRenderingContext2D;
    hiddenCtx: CanvasRenderingContext2D;
  }

  /** 绘制圆点的配置对象 */
  interface DrawingCircularConfig {
    ctx: CanvasRenderingContext2D | CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    hardness: number;
    innerColor?: string;
    outerColor?: string;
  }

  interface DrawImageLineBorderConfig {
    positionRange: PositionRange;
    ctx: CanvasRenderingContext2D;
    lineStyle?: string;
    lineWidth?: number;
  }

  export interface CreateContext2DConfig {
    targetSize?: RectSize;
    cloneCanvas?: HTMLCanvasElement;
  }
}
