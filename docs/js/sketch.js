const SIZE = 4;
const PADDING = 8;
const GENERATIONS = 1;

let board = new Board(SIZE);
board.generate(GENERATIONS);
board.generate(GENERATIONS);

function getCanvasWidth() {
  return 400;
}
function getCanvasHeight() {
  return getCanvasWidth();
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight());
  textAlign(CENTER, CENTER);
  textSize(getCanvasWidth() / board.getSize() / 4);
  textStyle(BOLD);
}

function draw() {
  const size = (getCanvasWidth() - 2 * PADDING) / board.getSize();
  const margin = size / 16;
  const values = board.getValues();

  background(24);
  noStroke();

  for (let i = 0; i < board.getSize(); i++) {
    for (let j = 0; j < board.getSize(); j++) {
      if (values[i][j] === 0) continue;

      fill(32);
      rect(i * size + margin + PADDING, j * size + margin + PADDING, size - 2 * margin, size - 2 * margin, size / 16);
      fill(255);
      text(values[i][j], i * size + size / 2 + PADDING, j * size + size / 2 + PADDING);
    }
  }
}

function keyPressed() {
  const keyCodeMoveMap = {
    [UP_ARROW]: 'up',
    [DOWN_ARROW]: 'down',
    [RIGHT_ARROW]: 'right',
    [LEFT_ARROW]: 'left',
  };

  switch (keyCode) {
    case UP_ARROW:
      board.pushUp();
      board.generate(GENERATIONS);
      break;
    case DOWN_ARROW:
      board.pushDown();
      board.generate(GENERATIONS);
      break;
    case LEFT_ARROW:
      board.pushLeft();
      board.generate(GENERATIONS);
      break;
    case RIGHT_ARROW:
      board.pushRight();
      board.generate(GENERATIONS);
      break;
  }
}
