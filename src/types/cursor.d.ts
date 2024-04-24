export {};
declare global {
  interface CursorStyle {
    display?: string;
    left?: string;
    top?: string;
    cursor?: string;
    width?: string;
  }

  interface UserCursorConfig {
    inputCtx: CanvasRenderingContext2D | null;
    isDragging: boolean;
    isErasing: boolean;
    radius: number;
    hardness: number;
  }
}
