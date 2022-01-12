const container = document.getElementById("container");
let defaultGridSize = 10;
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const clearButton = document.getElementById("clearButton");
const eraserButton = document.getElementById("eraserButton");
const rainbowButton = document.getElementById("rainbowButton");
const gridlineButton = document.getElementById("removeGridButton");
const colorPicker = document.getElementById("colorPicker");
gridlineButton.addEventListener('click',ToggleGridLines);
colorPicker.addEventListener("input",changePenColor);
clearButton.addEventListener('click',clearGrid)
eraserButton.addEventListener('click',ToggleEraser);
rainbowButton.addEventListener('click',ToggleRainbow);
let penColor = "black";
let TempPenColor ="black";
let RainbowColor = ["red","orange","yellow","green","blue","indigo","violet"];
let RainbowIndex = 0;
function changePenColor(e)
{
  rainbowButton.value = "Rainbow off"
  penColor = e.target.value;
  TempPenColor = e.target.value;
}
function clearGrid(){
makeNewGrid(defaultGridSize);
}
function ToggleEraser(e){
  console.log(e.target.value);
  if(e.target.value === "Eraser off"){
    rainbowButton.value = "Rainbow off"
    eraserButton.value = "Eraser on"
    penColor = "white";
  }
  else{
    penColor = TempPenColor;
    eraserButton.value = "Eraser off"
  }
}
function ToggleRainbow(e){
  console.log(e.target.value);
  if(e.target.value === "Rainbow off"){
    rainbowButton.value = "Rainbow on"
    
  }
  else{
    penColor = TempPenColor;
    rainbowButton.value = "Rainbow off"
  }
}
function ToggleGridLines(e){
   const grid_items = document.getElementsByClassName("grid-item");
   for(let i=0;i<(defaultGridSize*defaultGridSize) ;i++)
   {grid_items[i].classList.toggle("grid-lines");}
   console.log(e.target.value);
   if(e.target.value === "Hidden Grid Lines"){
    gridlineButton.value = "Shown Grid Lines";
   }
   else{
    gridlineButton.value = "Hidden Grid Lines";
   }

}
function makeNewGrid(gridSize){
  container.innerHTML='';
  console.log(gridSize);
  defaultGridSize=gridSize;
 
  container.style.gridTemplateColumns = `repeat(${gridSize},1fr)`
  container.style.gridTemplateRows = `repeat(${gridSize},1fr)`

  for(let i=0;i<gridSize*gridSize;i++)
  {
    let grid_item = document.createElement("div");
    grid_item.classList.add("grid-item");
    if(gridlineButton.value="Shown Grid Lines"){
      grid_item.classList.add("grid-lines");
    }
    
    container.appendChild(grid_item);
    grid_item.addEventListener("mouseenter",sketchCell);
    grid_item.addEventListener("mousedown",sketchCell);
  }
}
function sketchCell(e){
  
  if(e.buttons > 0){
  if(rainbowButton.value === "Rainbow on"){
    penColor=RainbowColor[RainbowIndex];
    e.target.style=`background-color:${penColor}`;
    RainbowIndex++;
    if(RainbowIndex>6){RainbowIndex=0;}
  }
  {e.target.style= `background-color:${penColor}`;}
  }
}
makeNewGrid(16);


slider.onchange = (e) => {makeNewGrid(e.target.value); sliderValue.textContent = e.target.value;defaultGridSize=e.target.value;}
