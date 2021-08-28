console.log("Etch-A-Sketch");

let currentColor = '#EF7C8E';
let currentMode = 'color';
let currentSize = 16
let currentColoumn = 2*currentSize;

const grid = document.getElementById('grid')
const colorButton = document.getElementById('colorButton')
const colorPicker = document.getElementById('colorPicker')
const rainbowButton = document.getElementById('rainbowButton')
const eraserButton = document.getElementById('eraserButton')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const reset = document.getElementById('reset')

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorButton.onclick = () => setCurrentMode('color')
rainbowButton.onclick = () => setCurrentMode('rainbow')
eraserButton.onclick = () => setCurrentMode('eraser')
reset.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${2*value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${2*size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < 2 * size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.addEventListener('mouseover', changeColor)
        grid.appendChild(gridElement)
    }
}
  
function changeColor(e) {
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowButton.classList.remove('active')
    } else if (currentMode === 'color') {
        colorButton.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowButton.classList.add('active')
    } else if (newMode === 'color') {
        colorButton.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('active')
    }
}
  
window.onload = () => {
    setupGrid(16)
    activateButton(currentMode)
}
  


