// "use client";
import { useEffect, useMemo, useRef } from "react";
import style from "./matting.module.scss";
// import useMattingCursor from "@/hooks/useMattingCursor";
import { useMatting } from "@/hooks/useMatting";
import { useMattingBoard } from "@/hooks/useMattingBoard";

import useStore from "@/store/resource";

export default function Matting() {
  const inputCvsRef = useRef<HTMLCanvasElement>(null);
  const outputCvsRef = useRef<HTMLCanvasElement>(null);

  const { picFile, isErasing, radius, hardness, setMatState } = useMatting();

  const {} = useMattingBoard({ picFile, isErasing, radius, hardness });

  // const {cursorImage, mattingCursorStyle, renderOutputCursor} = useMattingCursor({
  //   inputCtx,
  //   isDragging: draggingInputBoard,
  //   isErasing,
  //   redius,
  //   hardness
  // });

  return (
    <div className={style.editCtn}>
      <div className="w-[80%] h-[80%]">
        <canvas
          id="inputCvs"
          className={style.mattingBoard}
          ref={inputCvsRef}
        />
        <img className={style.mattingCursor} alt="" />
      </div>
      <div className="w-[80%] h-[80%]">
        <canvas
          id="outputCvs"
          className={style.resultBoard}
          ref={outputCvsRef}
        />
        <img className={style.mattingCursor} alt="" />
      </div>
    </div>
  );
}
