const container = document.querySelector('.container');
const clearBtn = document.querySelector('#clear');
const randomColorBtn = document.querySelector('#rainbow');
const eraseBtn = document.querySelector('#eraser');
const colorPicker = document.querySelector('#favcolor')
let randomColor = false;
let click = false;
let color = false;
let eraser = false;

// Generates the grid
function generateGrid(rows, cols) {
    for (let i = 0; i < (rows * cols); i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        container.appendChild(div);
    }
}

generateGrid(16, 16);

// toggle grid lines
function clearGrid() {
   const arr = container.children;
   const children = [].slice.call(arr);
   children.forEach((child) => {
    if (child.style.border !== 'none') {
        child.style.border = 'none';
    } else {
        child.style.border = '1px solid rgba(0, 0, 0, 0.233)';
    }
   })
}

clearBtn.addEventListener('click', () => {
    clearGrid();
    if (click === true) {
        clearBtn.classList.remove('clicked');
        click = false;
    } else {
        click = true;
        clearBtn.classList.add('clicked');
    }
});

// set random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


// follow mouse
function getChildren() {
    const arr = container.children;
    const children = [].slice.call(arr);
    children.forEach((child) => {
        child.addEventListener('mouseover', () => {
            // child.style.backgroundColor = 'red'
            if (randomColor === true) {
                child.style.backgroundColor = getRandomColor();
            }
            else if (eraser === true) {
                randomColor = false;
                randomColorBtn.classList.remove('clicked');
                child.style.backgroundColor = '';
            }
            else {
                child.style.backgroundColor = colorPicker.value;
            }
        });
    })
}

getChildren();

randomColorBtn.addEventListener('click', () => {
    if (randomColor === true) {
        randomColorBtn.classList.remove('clicked');
        randomColor = false;
    } else {
        randomColor = true;
        randomColorBtn.classList.add('clicked');
    }
});

// eraser feature
eraseBtn.addEventListener('click', () => {
    if (eraser === true) {
        eraseBtn.classList.remove('clicked');
        eraser = false;
    } else {
        eraser = true;
        eraseBtn.classList.add('clicked');
    }
});

// color picker
colorPicker.addEventListener('input', (e) => e.target.value);