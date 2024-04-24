import { create } from "zustand";

const useStore = create<storeProps>()((set)=>({
    img: null,
    setImg: (file)=>{
        set({img: file});
    }
}))

export default useStore;