import { INITIAL_TRANSFORM_CONFIG } from "@/const";
import { createContext2D } from "@/helpers/dom";
import ListenerManger from "@/helpers/listenerManager";
import { useState } from "react";

const inputDrawingCtx: CanvasRenderingContext2D = createContext2D();
const outputDrawingCtx: CanvasRenderingContext2D = createContext2D();

export function useMattingBoard(props: MattingProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [inputCtx, setInputCtx] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [outputCtx, setOutputCtx] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [initMattingResult, setInitMattingResult] =
    useState<InitMattingResult | null>(null);
  const [draggingInputBoard, setDraggingInputBoard] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [transformConfig, setTransformConfig] = useState<TransformConfig>(
    INITIAL_TRANSFORM_CONFIG
  );
  const [mattingSources, setMattingSources] = useState<ImageSources | null>(
    null
  );
  const [boardRect, setBoardRect] = useState<BoardRect | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [inputHiddenCtx, setInputHiddenCtx]: any = useState(createContext2D());
  const [outputHiddenCtx, setOutputHiddenCtx]: any = useState(
    createContext2D()
  );

  // 监听器
  const listenerManager = new ListenerManger();
  const initMattingConfig: InitMattingBaseConfig = {
    boardContexts: {
      inputCtx,
      outputCtx,
      inputDrawingCtx,
      outputDrawingCtx,
      inputHiddenCtx,
      outputHiddenCtx,
    },
    initMattingResult,
    transformConfig,
    mattingSources,
    initialized,
    boardRect,
  };
  const initListenersConfig = {
    ...initMattingConfig,
    draggingInputBoard,
    isDrawing,
    listenerManager,
  };

  const stateSetters = {
    width: setWidth,
    height: setHeight,
    inputCtx: setInputCtx,
    outputCtx: setOutputCtx,
    initMattingResult: setInitMattingResult,
    draggingInputBoard: setDraggingInputBoard,
    isDrawing: setIsDrawing,
    transformConfig: setTransformConfig,
    mattingSources: setMattingSources,
    boardRect: setBoardRect,
    initialized: setInitialized,
    inputHiddenCtx: setInputHiddenCtx,
    outputHiddenCtx: setOutputHiddenCtx,
  };

  const setMatBoardState = (key: keyof typeof stateSetters, value: any) => {
    const setter = stateSetters[key];
    if (setter) setter(value);
  };

  // useInitMattingBoards(props, { ...initMattingConfig, width, height });
  // useInitDrawingListeners(props, initListenersConfig);
  // useInitTransformListener(initListenersConfig);

  return {
    width,
    height,
    inputCtx,
    outputCtx,
    inputHiddenCtx,
    inputDrawingCtx,
    outputDrawingCtx,
    outputHiddenCtx,
    draggingInputBoard,
    transformConfig,
    initialized,
    mattingSources,
    setMatBoardState
  };
}
