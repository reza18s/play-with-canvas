import { useState } from "react";
import { useLocalStore } from "./store/useLocalStore";
import Canvas from "./board/Canvas";
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
        </button>{" "}
        <button
          onClick={() => {
            setCanvasType("ellipse");
          }}
        >
          ellipse
        </button>
        <button
          onClick={() => {
            setCanvasType("triangle");
          }}
        >
          triangle
        </button>
      </div>
      {canv && <Canvas canv={canv} setCanv={setCanv}></Canvas>}
    </div>
  );
}
