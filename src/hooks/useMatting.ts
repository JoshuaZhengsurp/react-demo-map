import { INITIAL_HARDNESS, INITIAL_RADIUS } from "@/const";
import { useState } from "react";

/**
 * 抠图画笔的一些基本配置
*/

enum Setters {
  picFile = 'picFile',
  isErasing = 'isErasing',
  radius = 'radius',
  hardness = 'hardness',
}

type SetterType = keyof typeof Setters

export function useMatting(): Matting {
  const [picFile, setPicFile] = useState<null | File>(null);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [radius, setRadius] = useState(INITIAL_RADIUS);
  const [hardness, setHardness] = useState(INITIAL_HARDNESS);

  const setters: Record<SetterType, any> = {
    picFile: setPicFile,
    isErasing: setIsErasing,
    radius: setRadius,
    hardness: setHardness,
  };

  const setMatState = (key: SetterType, value: any) => {
    const setter = setters[key];
    setter && setter(value);
  };

  return {
    picFile,
    isErasing,
    radius,
    hardness,
    setMatState,
  };
}
