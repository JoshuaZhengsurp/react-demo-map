import {
  INITIAL_RADIUS,
  INITIAL_HARDNESS,
  REPAIR_POINT_INNER_COLOR,
  REPAIR_POINT_OUTER_COLOR,
  ERASE_POINT_INNER_COLOR,
  ERASE_POINT_OUTER_COLOR,
  EventType,
} from "@/const";
import { drawBrushPoint, getLoadedImage } from "@/helper/dom";
import { useEffect } from "react";

/** 抠图指针 */
class MattingCursor {
  ctx: CanvasRenderingContext2D;
  cursorImage: string | undefined = "";
  inputCursorStyle: CursorStyle | null = null;
  mattingCursorStyle: CursorStyle | null = null;
  radius: number = INITIAL_RADIUS;
  hardness: number = INITIAL_HARDNESS;

  get inputCanvas() {
    return (this.inputCtx as CanvasRenderingContext2D).canvas as HTMLElement;
  }
  get pointInnerColor() {
    return this.isErasing ? ERASE_POINT_INNER_COLOR : REPAIR_POINT_INNER_COLOR;
  }
  get pointOuterColor() {
    return this.isErasing ? ERASE_POINT_OUTER_COLOR : REPAIR_POINT_OUTER_COLOR;
  }

  constructor(
    private inputCtx: CanvasRenderingContext2D | null,
    private isErasing: boolean
  ) {
    this.ctx = this.creatCursorCanvas();
    this;
  }

  creatCursorCanvas() {
    const ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    return this.updateCtx(ctx);
  }

  updateCtx(ctx: CanvasRenderingContext2D) {
    ctx.canvas.width = this.radius * 2;
    ctx.canvas.height = this.radius * 2;
    return ctx;
  }

  renderOutputCursor() {
    const target = this.inputCanvas;
    target.addEventListener(EventType.Mouseover, this.onShowCursor.bind(this));
    target.addEventListener(
      EventType.Mousemove,
      this.onRenderOutputCursor.bind(this)
    );
    target.addEventListener(EventType.Mouseout, this.onHideCursor.bind(this));
  }

  onShowCursor() {
    this.mattingCursorStyle!.display = "initial";
  }
  onRenderOutputCursor(e: MouseEvent) {
    this.mattingCursorStyle!.left = e.offsetX - this.radius + "px";
    this.mattingCursorStyle!.top = e.offsetY - this.radius + "px";
  }
  onHideCursor() {
    this.mattingCursorStyle!.display = "none";
  }

  updateCursorParams(curHardnewss: number, curRedius: number) {
    this.hardness = curHardnewss;
  }

  async createCursorImage() {
    this.ctx = this.updateCtx(this.ctx);
    const drawingConfig: DrawingCircularConfig = {
      ctx: this.ctx as CanvasRenderingContext2D,
      x: this.radius,
      y: this.radius,
      radius: this.radius,
      hardness: this.hardness,
      innerColor: this.pointInnerColor,
      outerColor: this.pointOuterColor,
    };
    drawBrushPoint(drawingConfig);
    await this.drawIcon();
    return await this.ctx.canvas.toDataURL();
  }

  async drawIcon() {
    const name = this.isErasing ? "1705221790070" : "1705222036932";
    const eraser = await getLoadedImage(
      `https://xqart.oss-cn-beijing.aliyuncs.com/bitDance/poster/photo/${name}.png`
    );
    this.ctx.drawImage(eraser, 0, 0, this.radius * 2, this.radius * 2);
  }

  changeOutputCursorByDrag(isDragging: boolean) {
    if (isDragging) {
      this.onHideCursor();
    } else {
      this.onShowCursor();
    }
  }
}

export default function useMattingCursor(config: UserCursorConfig) {
  const { inputCtx, isDragging, isErasing, hardness, radius } = config;
  const mattingCursor = new MattingCursor(inputCtx, isErasing);
  const { cursorImage, mattingCursorStyle, renderOutputCursor } = mattingCursor;

  useEffect(() => {
    mattingCursor.updateCursorParams(hardness, radius);
    const createCursorImage = async () => {
      mattingCursor.cursorImage = await mattingCursor.createCursorImage();
    };
    createCursorImage();
  });

  useEffect(() => {
    mattingCursor.changeOutputCursorByDrag.bind(mattingCursor)(isDragging);
  }, [isDragging]);

  return {
    mattingCursor,
    mattingCursorStyle,
    cursorImage,
    renderOutputCursor: renderOutputCursor.bind(mattingCursor),
  };
}
