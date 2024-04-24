export {};
declare global {
  /** 绘制圆点的配置对象 */
  interface storeProps {
    img: File | null;
    setImg: (file: File | null) => void;
  }
}
