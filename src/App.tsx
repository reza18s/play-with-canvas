import { useEffect, useState } from "react";
import Canvas from "./Canvas";

export default function App() {
   const [canv, setCanv] = useState<HTMLCanvasElement | null>(null);
   const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   });
   useEffect(() => {
      const resizeHandler = (event: UIEvent) => {
         setSize({ width: window.innerWidth, height: window.innerHeight });
      };
      addEventListener("resize", resizeHandler);

      return () => document.removeEventListener("resize", resizeHandler);
   }, []);
   console.log(size, canv);
   return (
      <div className="h-screen w-screen">
         <canvas
            className="myCanvas absolute h-screen  w-screen bg-black"
            ref={(ref) => setCanv(ref)}
            height={size.height}
            width={size.width}
         ></canvas>
         {canv && <Canvas canv={canv} setCanv={setCanv}></Canvas>}
      </div>
   );
}
