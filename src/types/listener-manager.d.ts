export interface UnbindDownUpConfig {
  // 解绑的回调
  unbindDown: VoidFunction;
  unbindUp: VoidFunction;
}

// 解绑监听器
export type UnbindDownUpCache = WeakMap<HTMLElement, UnbindDownUpConfig>;
export type UnbindMoveCache = WeakMap<HTMLElement, VoidFunction>;
export type UnbindWheelCache = Set<VoidFunction>;

// 触发事件时的回调
export interface MouseListenerContext {
  mouseTarget: HTMLElement;
  move: (ev: MouseEvent) => void;
  down: (ev: MouseEvent) => void | boolean;
  up: (ev: MouseEvent) => void;
}

export interface ListenerConfig {
  eventType: string;
  listener: EventListener;
  stop?: boolean;
  prevent?: boolean;
}

export interface wheelListenerContext {
  mattingBoards: HTMLCanvasElement[];
  wheel: (ev: WheelEvent) => void;
}
