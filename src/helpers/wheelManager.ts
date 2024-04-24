import { EventType } from "@/const";

export default class ListenerManger {
  private unbindWheelCache: UnbindWheelCache = new Set();
  // 初始化滚动wheel事件监听器
  initWheelListener(listenerConfig: wheelListenerContext): VoidFunction {
    this.removeWheelListeners();
    const removeWheel = this.bindWheelListener(listenerConfig);
    this.unbindWheelCache.add(removeWheel);
    return removeWheel;
  }

  // 解绑wheel事件监听器
  removeWheelListeners() {
    this.unbindWheelCache.forEach((unbind) => unbind());
    this.unbindWheelCache.clear();
  }

  // 绑定wheel事件监听器
  private bindWheelListener(listenerConfig: wheelListenerContext) {
    const { mattingBoards, wheel } = listenerConfig;
    return this.listenEvent(
      {
        eventType: EventType.Wheel,
        listener: (ev) => {
          if (this.isWheel(ev, mattingBoards)) {
            wheel(ev as WheelEvent);
          }
        },
      },
      false,
      ...mattingBoards
    );
  }

  // 是否可以wheel
  private isWheel(ev: Event, mattingBoards: HTMLCanvasElement[]): boolean {
    return mattingBoards.some((board) => ev.target === board);
  }
}
