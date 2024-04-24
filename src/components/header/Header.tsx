import React from "react";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";

import useStore from "@/store/resource";



export default function Header() {
  const setImg = useStore((state)=>state.setImg);

  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    multiple: false,
    onChange(info){
      if(info.file.status === 'removed'){
        setImg(null);  
      } else {
        setImg(info.file.originFileObj as File);
      }
    }
  }

  return (
    <div className="flex justify-around w-[100%]">
      <Upload {...props}>
        <Button>上传</Button>
      </Upload>
      <Button>抠图</Button>
    </div>
  );
}
