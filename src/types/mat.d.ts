export {};
declare global {
  type InitMattingResult = ImageSources & TransformConfig;

  interface ImageSources {
    /** 原始图片的绘制数据(原始图片初始化结果) */
    raw: ImageBitmap;
    /** 蒙版图片的绘制数据(蒙版图片初始化结果) */
    mask: ImageBitmap;
    orig: ImageBitmap;
    positionRange: any;
    scaleRatio: any;
  }

  export interface InitMattingBaseConfig {
    boardContexts: BoardContext2Ds;
    initMattingResult: InitMattingResult | null;
    transformConfig: TransformConfig;
    mattingSources: ImageSources | null;
    boardRect: BoardRect | null;
    initialized: boolean;
  }
}
