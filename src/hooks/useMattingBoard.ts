import { INITIAL_TRANSFORM_CONFIG } from "@/const";
import { createContext2D } from "@/helpers/dom";
import ListenerManger from "@/helpers/listenerManager";
import { useState } from "react";
import { useInitMattingBoards } from "./init/useInitMattingBoards";

/**
 * 抠图面板基本配置
 */

enum Setters {
  width = "width",
  height = "height",
  inputCtx = "inputCtx",
  outputCtx = "outputCtx",
  initMattingResult = "initMattingResult",
  draggingInputBoard = "draggingInputBoard",
  isDrawing = "isDrawing",
  transformConfig = "transformConfig",
  mattingSources = "mattingSources",
  boardRect = "boardRect",
  initialized = "initialized",
  inputHiddenCtx = "inputHiddenCtx",
  outputHiddenCtx = "outputHiddenCtx",
}
type SettersType = keyof typeof Setters

const inputDrawingCtx: CanvasRenderingContext2D = createContext2D();
const outputDrawingCtx: CanvasRenderingContext2D = createContext2D();

// 修改状态
let setters: Record<SettersType, Function>;
const setMatBoardState = (key: SettersType, value: any) => {
  const setter = setters[key];
  if (setter) setter(value);
};

export function useMattingBoard(props: MattingProps) {
  // 画布宽高, 输入输出canvas上下文
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [inputCtx, setInputCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [outputCtx, setOutputCtx] = useState<CanvasRenderingContext2D | null>(null);
  
  // 初始化matting
  const [initMattingResult, setInitMattingResult] = useState<InitMattingResult | null>(null);
  const [transformConfig, setTransformConfig] = useState<TransformConfig>(INITIAL_TRANSFORM_CONFIG);

  // 拖拽画布
  const [draggingInputBoard, setDraggingInputBoard] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // 图片资源
  const [mattingSources, setMattingSources] = useState<ImageSources | null>(null);
  // 画布矩形尺寸
  const [boardRect, setBoardRect] = useState<BoardRect | null>(null);
  const [initialized, setInitialized] = useState(false);

  // 隐藏canvas上下文, 用于叠加原图层的
  const [inputHiddenCtx, setInputHiddenCtx] = useState(createContext2D());
  const [outputHiddenCtx, setOutputHiddenCtx] = useState(createContext2D());
  
  // 事件管理器
  const listenerManager = new ListenerManger();
  
  // 初始画布的配置
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

  // 初始事件监听配置
  const initListenersConfig = {
    ...initMattingConfig,
    draggingInputBoard,
    isDrawing,
    listenerManager,
  };

  setters = {
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

  // 使用hook 初始化配置
  useInitMattingBoards(props, { ...initMattingConfig, width, height });
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
    setMatBoardState,
  };
}

export { setMatBoardState };
