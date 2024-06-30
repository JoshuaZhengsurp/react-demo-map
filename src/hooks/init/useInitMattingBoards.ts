import { useEffect } from "react";
import { setMatBoardState } from "../useMattingBoard";
import { computeBoardRect } from "@/helpers/init-compute";
import { resizeCanvas } from "@/helpers/dom";
import { EventType } from "@/const";
import { initMatting } from "@/helpers/init-matting";

/**
 * 初始化抠图画板
 */
/**
 * @problem do it need getter to gain current state
*/
export const useInitMattingBoards = (
  props: MattingProps,
  config: UseInitMattingBoardsConfig
) => {
  const { picFile } = props;
  const { boardContexts } = config;
  const { width, height, } = config;
  const { transformConfig } = config;

  const updateBoardRect = () => {
    setMatBoardState(
      "boardRect",
      computeBoardRect(boardContexts.inputCtx!.canvas)
    );
  };

  /**
   * 当画布相关属性被修改后, 重新绘制画布 
  */
  const resizeBoards = (width: number, height: number, transformConfig: TransformConfig) => {
    requestAnimationFrame(() => {
      const commonConfig = {
        targetWidth: width,
        targetHeight: height,
        transformConfig,
      };
      resizeCanvas({
        ctx: boardContexts.inputCtx as CanvasRenderingContext2D,
        hiddenCtx: boardContexts.inputHiddenCtx as CanvasRenderingContext2D,
        ...commonConfig,
      });
      resizeCanvas({
        ctx: boardContexts.outputCtx as CanvasRenderingContext2D,
        hiddenCtx: boardContexts.outputHiddenCtx as CanvasRenderingContext2D,
        withBorder: true,
        ...commonConfig,
      });
    });
  };

  useEffect(() => {
    if (picFile && width && height) {
      const toInitMatting = async () => {
        setMatBoardState('initialized', false);
        const initMattingResult = await initMatting({
          boardContexts,
          picFile,
          targetSize: {  width, height },
          transformConfig: {},
          imageSources: {},
        })
        setMatBoardState('initMattingResult', initMattingResult);
        
        const { raw, mask, orig, positionRange, scaleRatio } = initMattingResult;
        transformConfig.positionRange = positionRange;
        transformConfig.scaleRatio = scaleRatio;
        setMatBoardState('mattingSources', { raw, mask, orig});
        updateBoardRect();
        resizeBoards(width, height, transformConfig);
      }
      toInitMatting().then(()=>{
        setMatBoardState('initialized', true);
      });
    }
  }, [picFile]);


  const toResizeBoards = () => {
    resizeBoards(width, height, transformConfig);
  }
  useEffect(() => {
    window.addEventListener(EventType.Resize, toResizeBoards);
    return () => {
      window.addEventListener(EventType.Resize, toResizeBoards);
    };
  }, []);
};
