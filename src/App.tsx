import { useState } from "react";
import Canvas from "./board/Square";
import { useLocalStore } from "./store/useLocalStore";
export default function App() {
  const [canv, setCanv] = useState<HTMLCanvasElement | null>(null);
  const { setCanvasType } = useLocalStore((state) => state);
  return (
    <div className="h-screen w-screen">
      <canvas
        className=" absolute -z-10  h-screen w-screen bg-black"
        id="canvas"
        ref={(ref) => {
          setCanv(ref);
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <div className="">
        <button
          onClick={() => {
            setCanvasType("square");
          }}
        >
          square
        </button>
      </div>
      {canv && <Canvas canv={canv} setCanv={setCanv}></Canvas>}
    </div>
  );
}
