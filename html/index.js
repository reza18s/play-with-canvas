const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
canv.width = window.innerWidth;
canv.height = window.innerHeight;
const mouse = { x: 0, y: 0 };
const createCircle = () => {
   ctx.fillStyle = "red";
   ctx.beginPath();
   ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
   ctx.fill();
};
window.addEventListener("resize", () => {
   canv.width = window.innerWidth;
   canv.height = window.innerHeight;
   console.log(canv);
});
document.addEventListener("click", (event) => {
   mouse.x = event.x;
   mouse.y = event.y;
   createCircle();
});
createCircle();
