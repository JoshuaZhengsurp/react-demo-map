import { useEffect } from "react";
import { setMatBoardState } from "../useMattingBoard";
import { computeBoardRect } from "@/helpers/init-compute";
import { resizeCanvas } from "@/helpers/dom";

/**
 * 初始化抠图画板
 */
export const useInitMattingBoards = (
  props: MattingProps,
  config: UseInitMattingBoardsConfig
) => {
  const { picFile } = props;
  const { boardContexts } = config;
  const { width, height, initialized, initMattingResult } = config;
  const { boardRect, transformConfig, mattingSources } = config;

  const updateBoardRect = () => {
    setMatBoardState(
      "boardRect",
      computeBoardRect(boardContexts.inputCtx!.canvas)
    );
  };

  const resizeBoards = () => {
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
    
  }, [picFile]);

  useEffect(() => {
    return () => {};
  }, []);
};
