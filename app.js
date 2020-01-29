const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 7.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
} 

function onMouseMove(event){
    const x = event.offsetX
    const y = event.offsetY
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
}
function handleRange(event){
    ctx.lineWidth = event.srcElement.value;
}
function modeChange(event){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    } 
    else{
        filling = true;
        mode.innerText = "paint";
    }
}
function handlePaint(event){
    if(filling){
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0, 0, 700, 700);
        modeChange(1);
    }
}
function handleCM(event){
    event.preventDefault();
    console.log(event);
}
function handleSave(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handlePaint);
    canvas.addEventListener("contextmenu", handleCM);
}
if(range){
    range.addEventListener("input", handleRange);
}
if(mode){
    mode.addEventListener("click", modeChange);
}
if(save){
    save.addEventListener("click", handleSave);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
