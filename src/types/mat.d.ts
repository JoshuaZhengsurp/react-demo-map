export {};
declare global {
  type InitMattingResult = ImageSources & TransformConfig;

  /** 绘制基础配置对象 */
  export interface MattingBoardBaseConfig {
    boardContexts: BoardContext2Ds;
    /** 画布目标尺寸 */
    targetSize: RectSize;
    /** 图像绘制时与画布边缘最小间隙 */
    gapSize?: GapSize;
  }

  interface ImageSources {
    /** 原始图片的绘制数据(原始图片初始化结果) */
    raw: ImageBitmap;
    /** 蒙版图片的绘制数据(蒙版图片初始化结果) */
    mask: ImageBitmap;
    orig: ImageBitmap;
    positionRange: PositionRange;
    scaleRatio: number;
  }

  export interface InitMattingBaseConfig {
    boardContexts: BoardContext2Ds;
    initMattingResult: InitMattingResult | null;
    transformConfig: TransformConfig;
    mattingSources: ImageSources | null;
    boardRect: BoardRect | null;
    initialized: boolean;
  }

  // 初始化抠图画板的基础配置对象
  export interface UseInitMattingBoardsConfig extends InitMattingBaseConfig {
    width: number;
    height: number;
  }

  export interface InitMattingConfig extends MattingBoardBaseConfig {
    picFile: File,
    transformConfig: Partial<TransformConfig>,
    imageSources: Partial<ImageSources>;
  }
}
