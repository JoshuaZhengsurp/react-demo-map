import { DEFALUT_IMAGE_SHOOTH_CHOICE } from "@/const";
import { getLoadedImage } from "./dom";

export async function initMatting(
  initMattingConfig: InitMattingConfig
): Promise<InitMattingResult> {
  const {
    boardContexts: {
      inputCtx,
      outputCtx,
      inputHiddenCtx,
      inputDrawingCtx,
      outputHiddenCtx,
      outputDrawingCtx,
    },
    picFile,
  } = initMattingConfig;

  inputCtx && (inputCtx.imageSmoothingEnabled = DEFALUT_IMAGE_SHOOTH_CHOICE);
  outputCtx && (outputCtx.imageSmoothingEnabled = DEFALUT_IMAGE_SHOOTH_CHOICE);
  const imageSource = await getLoadedImage(picFile);
  console.log(
    inputHiddenCtx,
    inputDrawingCtx,
    outputHiddenCtx,
    outputDrawingCtx,
    imageSource
  );
  //   const {scale} = getVa
  return {} as InitMattingResult;
}
