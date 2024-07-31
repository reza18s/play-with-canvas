import { useEffect, useState } from "react";

export default function Canvas({
  canv,
}: {
  canv: HTMLCanvasElement | null;
  setCanv?: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
}) {
  let isDrawing = false;
  const ctx = canv?.getContext("2d", { willReadFrequently: true });
  const mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    radius: 1000,
  };
  canv!.width = window.innerWidth;
  canv!.height = window.innerHeight;
  useEffect(() => {
    const resizeHandler = () => {
      canv!.width = window.innerWidth;
      canv!.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener("mousemove", clickHandler);
    return () => window.removeEventListener("mousemove", clickHandler);
  }, []);
  const animation = () => {
    ctx?.clearRect(0, 0, canv!.width, canv!.height);

    ctx?.beginPath();
    ctx!.strokeStyle = "rgb(255,255,255)";
    ctx!.lineWidth = 5;
    ctx?.strokeRect(
      mouse.startX,
      mouse.startY,
      mouse.x - mouse.startX,
      mouse.y - mouse.startY,
    );
    if (isDrawing) {
      requestAnimationFrame(animation);
    }
  };
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      mouse.startX = event.x;
      mouse.startY = event.y;
      isDrawing = true;
      animation();

      console.log(event);
    };
    window.addEventListener("mousedown", clickHandler);
    return () => window.removeEventListener("mousedown", clickHandler);
  }, []);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      ctx?.beginPath();
      ctx!.fillStyle = "rgb(255,255,255)";
      ctx?.fillRect(
        mouse.startX,
        mouse.startY,
        event.x - mouse.startX,
        event.y - mouse.startY,
      );
      isDrawing = false;

      console.log(event);
    };
    window.addEventListener("mouseup", clickHandler);
    return () => window.removeEventListener("mouseup", clickHandler);
  }, []);

  return <></>;
}
