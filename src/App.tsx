import { useEffect, useState } from "react";
import Canvas from "./canvas/CanvasCreateSquer";
import { socket } from "./socket";
export default function App() {
  const [canv, setCanv] = useState<HTMLCanvasElement | null>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log("con");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newClient", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.on("newClient", (data) => {
        console.log(data);
      });
    };
  }, []);
  return (
    <div className="h-screen w-screen">
      <canvas
        className="myCanvas absolute -z-10  h-screen w-screen bg-black"
        ref={(ref) => setCanv(ref)}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      {/* <div className="flex h-screen w-full items-center justify-center bg-transparent text-center text-9xl font-semibold">
        <h1 className=" border-t-2 border-white" id="text">
          Fuck u
        </h1>
      </div> */}
      {canv && <Canvas canv={canv} setCanv={setCanv}></Canvas>}
    </div>
  );
}
