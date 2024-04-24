export {};
declare global {
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

  export interface CreateContext2DConfig {
    targetSize?: RectSize;
    cloneCanvas?: HTMLCanvasElement;
  }
}
