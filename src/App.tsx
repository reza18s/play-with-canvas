import { useState } from "react";
import Canvas from "./Canvas";

export default function App() {
   const [canv, setCanv] = useState<HTMLCanvasElement | null>(null);
   console.log(canv);
   console.log(canv);
   return (
      <div className="h-screen w-screen">
         <canvas
            className="myCanvas absolute h-screen  w-screen bg-black"
            ref={(ref) => setCanv(ref)}
         ></canvas>
         {canv && <Canvas canv={canv} setCanv={setCanv}></Canvas>}
      </div>
   );
}
