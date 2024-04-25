import { EventType } from "@/const";

const { MouseDown, Mouseup, Mousemove } = EventType;

/**
 * mouse事件流 集中管理
 * 绑定事件, 并收集对应事件的卸载回调
*/

export default class ListenerManger {
  private unbindDownUpCache: UnbindDownUpCache = new WeakMap();
  private unbindMoveCache: UnbindMoveCache = new WeakMap();

  // 初始化鼠标监听
  initMouseListeners(ctx: MouseListenerContext) {
    const { mouseTarget } = ctx;
    this.removeMouseListeners(mouseTarget);
    const unbindConfig = this.bindMouseListeners(ctx);
    this.unbindDownUpCache.set(mouseTarget, unbindConfig);
  }

  // 移除鼠标监听
  removeMouseListeners(mouseTarget: HTMLElement) {
    const unbindConfig = this.unbindDownUpCache.get(mouseTarget);
    if (unbindConfig) {
      const { unbindDown, unbindUp } = unbindConfig;
      unbindDown();
      unbindUp();
    }
  }

  // 绑定鼠标事件监听器
  private bindMouseListeners(listenersContext: MouseListenerContext) {
    const { mouseTarget, down, move, up } = listenersContext;
    const moveListener = (ev: Event) => {
      // 回调函数作为参数，渲染后空余时间执行人物
      requestAnimationFrame(() => move(ev as MouseEvent));
    };
    const downListener = (ev: Event) => {
      const isTarget = ev.target === mouseTarget;
      const extraCondition = down && down(ev as MouseEvent);
      const shouldBindMove = extraCondition !== false;
      // down 如果返回true 说明, 将执行mouseMove事件, 需绑定mouseMove移除回调
      if (isTarget && shouldBindMove) {
        const removeMove = this.listenEvent({
          eventType: Mousemove,
          listener: moveListener,
          stop: true,
          prevent: true,
        });
        this.unbindMoveCache.set(mouseTarget, removeMove);
      }
    };
    const upListener = (ev: Event) => {
      up && up(ev as MouseEvent);
      this.unbindMoveListeners(mouseTarget);
    };
    const unbindDown = this.listenEvent({
      eventType: MouseDown,
      listener: downListener,
    });
    const unbindUp = this.listenEvent({
      eventType: Mouseup,
      listener: upListener,
    });
    return { unbindDown, unbindUp };
  }

  // 移除mousemove监听器
  private unbindMoveListeners(mouseTarget: HTMLElement) {
    const unbindMove = this.unbindMoveCache.get(mouseTarget);
    unbindMove && unbindMove();
    this.unbindMoveCache.delete(mouseTarget);
  }

  // 事件监听绑定, 并返回对应的解除事件监听的回调
  private listenEvent(
    listenerConfig: ListenerConfig,
    options: boolean | AddEventListenerOptions = false,
    ...targets: HTMLElement[]
  ): VoidFunction {
    const { eventType } = listenerConfig;
    const wrapListener = this.genWrapListener(listenerConfig);
    let removeListenerCallBack: VoidFunction;
    if (!this.isNeedToBindToTargets(targets)) {
      removeListenerCallBack = this.bindListener(
        window,
        eventType,
        wrapListener,
        options
      );
    } else {
      removeListenerCallBack = this.bindListeners(
        targets,
        eventType,
        wrapListener,
        options
      );
    }
    return removeListenerCallBack;
  }

  // 生成 启动事件监听函数
  private genWrapListener(listenerConfig: ListenerConfig) {
    const { listener, stop, prevent } = listenerConfig;
    return (ev: Event) => {
      if (stop) {
        ev.stopPropagation();
      }
      if (prevent) {
        ev.preventDefault();
      }
      listener(ev);
    };
  }

  // 是否需要绑定到目标元素上
  private isNeedToBindToTargets(targets: HTMLElement[]) {
    return targets.length !== 0;
  }

  // 为单个目标绑定监听器, 并返回对应的卸载监听器的回调
  private bindListener(
    target: Window | HTMLElement,
    eventType: string,
    listener: EventListener,
    options: boolean | AddEventListenerOptions
  ): VoidFunction {
    target.addEventListener(eventType, listener, options);
    return () => target.removeEventListener(eventType, listener, options);
  }

  // 为多个目标绑定监听器
  private bindListeners(
    targets: HTMLElement[],
    eventType: string,
    listener: EventListener,
    options: boolean | AddEventListenerOptions
  ): VoidFunction {
    targets.forEach((target) => {
      target.addEventListener(eventType, listener, options);
    });
    return () =>
      targets.forEach((target) => {
        target.removeEventListener(eventType, listener, options);
      });
  }
}
