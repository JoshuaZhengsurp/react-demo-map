// "use client";
import { useEffect, useMemo, useRef } from "react";
import style from "./matting.module.scss";
// import useMattingCursor from "@/hooks/useMattingCursor";
// import { useMatting } from "@/hooks/useMatting";
// import { useMattingBoard } from "@/hooks/useMattingBoard";

import useStore from "@/store/resource";

export default function Matting() {
  const inputCvsRef = useRef<HTMLCanvasElement>(null);
  const outputCvsRef = useRef<HTMLCanvasElement>(null);

  const inputCvsContext = useMemo(() => {
    if (inputCvsRef.current?.getContext("2d")) {
      inputCvsRef.current.width = inputCvsRef.current.clientWidth;
      inputCvsRef.current.height = inputCvsRef.current.clientHeight;
      return inputCvsRef.current.getContext("2d");
    }
    return null;
  }, [inputCvsRef.current]);
  const outputCvsContext = useMemo(() => {
    if (inputCvsRef.current?.getContext("2d")) {
      return inputCvsRef.current.getContext("2d");
    }
    return null;
  }, [outputCvsRef.current]);

  const img = useStore((state) => state.img);

  useEffect(() => {
    inputCvsContext &&
      inputCvsContext.clearRect(
        0,
        0,
        inputCvsRef.current!.width,
        inputCvsRef.current!.height
      );
    // console.log(img);
    if (img && inputCvsContext) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
          const width = inputCvsRef.current!.clientWidth;
          const height = inputCvsRef.current!.clientHeight;

          console.log(inputCvsRef.current?.clientWidth);

          const scaleX = width / image.width;
          const scaleY = height / image.height;

          const scale = Math.min(scaleX, scaleY);

          const x = width / 2 - (image.width / 2) * scale;
          const y = height / 2 - (image.height / 2) * scale;

          // console.log(width, height, image.width * scale, image.height * scale);

          inputCvsContext.drawImage(
            image,
            x,
            y,
            image.width * scale,
            image.height * scale
          );
        };
        image.src = event.target!.result as string;
        console.log("render");
      };
      reader.readAsDataURL(img);
    }
  }, [img]);

  // const { picFile, isErasing, radius, hardness, setMatState } = useMatting();

  // const {} = useMattingBoard({ picFile, isErasing, radius, hardness });

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
