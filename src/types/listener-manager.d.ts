export {};
declare global {
  interface UnbindDownUpConfig {
    // 解绑的回调
    unbindDown: VoidFunction;
    unbindUp: VoidFunction;
  }

  // 解绑监听器
  type UnbindDownUpCache = WeakMap<HTMLElement, UnbindDownUpConfig>;
  type UnbindMoveCache = WeakMap<HTMLElement, VoidFunction>;
  type UnbindWheelCache = Set<VoidFunction>;

  // 触发事件时的回调
  interface MouseListenerContext {
    mouseTarget: HTMLElement;
    move: (ev: MouseEvent) => void;
    down: (ev: MouseEvent) => void | boolean;
    up: (ev: MouseEvent) => void;
  }

  interface ListenerConfig {
    eventType: string;
    listener: EventListener;
    stop?: boolean;
    prevent?: boolean;
  }

  interface wheelListenerContext {
    mattingBoards: HTMLCanvasElement[];
    wheel: (ev: WheelEvent) => void;
  }
}
