import { useState } from "react";
import Canvas from "./CanvasConnectParticles";

export default function App() {
   const [canv, setCanv] = useState<HTMLCanvasElement | null>(null);
   return (
      <div className="h-screen w-screen">
         <canvas
            className="myCanvas absolute h-screen  w-screen bg-black"
            ref={(ref) => setCanv(ref)}
            width={window.innerWidth}
            height={window.innerHeight}
         ></canvas>
         {canv && <Canvas canv={canv} setCanv={setCanv}></Canvas>}
      </div>
   );
}
