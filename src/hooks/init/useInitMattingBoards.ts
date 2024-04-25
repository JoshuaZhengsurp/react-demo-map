import { useEffect } from "react";
import { setMatBoardState } from "../useMattingBoard";
import { computeBoardRect } from "@/helpers/init-compute";

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
      const commConfig = {
        targetWidth: width,
        targetHeight: height,
        transformConfig,
      };
      resizeCanvas({})
      // resizeCanvas({})
    });
  };

  useEffect(() => {}, [picFile]);

  useEffect(() => {
    return () => {};
  }, []);
};
