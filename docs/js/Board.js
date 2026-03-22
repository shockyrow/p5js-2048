class Board {
  /** @private {number} */
  _size;
  /** @private {number} */
  _score;
  /** @private {number[][]} */
  _values;

  /**
   * @param {number} size
   */
  constructor(size) {
    this._size = size;
    this.reset();
  }

  reset() {
    this._score = 0;
    this._values = [];

    for (let i = 0; i < this._size; i++) {
      let row = [];

      for (let j = 0; j < this._size; j++) {
        row.push(0);
      }

      this._values.push(row);
    }
  }

  /**
   * @param {number} count
   */
  generate(count) {
    /** @var {{x: number, y: number}[]} */
    let options = [];

    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        this._values[i][j] === 0 && options.push({x: i, y: j});
      }
    }

    const times = Math.min(count, options.length);

    for (let i = 0; i < times; i++) {
      const [choice] = options.splice(Math.floor(Math.random() * options.length), 1);
      this._values[choice.x][choice.y] = 2;
    }
  }

  pushUp() {
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        this._values[i][j] !== 0 && this._push(i, j, 0, -1);
      }
    }
  }

  pushRight() {
    for (let i = this._size - 1; i >= 0; i--) {
      for (let j = 0; j < this._size; j++) {
        this._values[i][j] !== 0 && this._push(i, j, 1, 0);
      }
    }
  }

  pushDown() {
    for (let i = 0; i < this._size; i++) {
      for (let j = this._size - 1; j >= 0; j--) {
        this._values[i][j] !== 0 && this._push(i, j, 0, 1);
      }
    }
  }

  pushLeft() {
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        this._values[i][j] !== 0 && this._push(i, j, -1, 0);
      }
    }
  }

  getSize() {
    return this._size;
  }

  getScore() {
    return this._score;
  }

  getValues() {
    return this._values;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} dx
   * @param {number} dy
   * @private
   */
  _push(x, y, dx, dy) {
    let tx = x, ty = y;

    while (
        this._inside(tx + dx, ty + dy) &&
        this._canMoveTo(x, y, tx + dx, ty + dy)
        ) {
      tx += dx;
      ty += dy;
    }

    if (tx === x && ty === y) return;

    this._values[tx][ty] += this._values[x][y];
    this._values[x][y] = 0;
    this._score += this._values[tx][ty];
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   * @private
   */
  _inside(x, y) {
    return x >= 0 && x < this._size && y >= 0 && y < this._size;
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @returns {boolean}
   * @private
   */
  _canMoveTo(x1, y1, x2, y2) {
    let isEmpty = this._values[x2][y2] === 0;
    let isEqual = this._values[x1][y1] === this._values[x2][y2];
    return isEmpty || isEqual;
  }
}
