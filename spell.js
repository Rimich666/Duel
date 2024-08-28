import {SPELL_SPEED} from "./src/main.jsx";

export class Spell {
  _v = SPELL_SPEED;
  constructor(x, y, r, color, index, width) {
    this._x = x;
    this._y = y;
    this._r = r;
    this._color = color;
    this._owner = index;
    this._direction = index * (-2) + 1;
    this._isAlive = true;
    this._isHit = false;
    this._width = width;
  }

  _getIsHit (enemy, x) {
    return(Math.sqrt((enemy.x - x)**2 + (enemy.y - this._y)**2) <= (enemy.r + this._r));
  }

  _isRight(x) {
    return x + this._r >= this._width;
  }

  _isLeft(x) {
    return x <= 0;
  }

  get isAlive() {
    return this._isAlive;
  }

  set isAlive(isAlive) {
    this._isAlive = isAlive;
  }

  get isHit() {
    return this._isHit;
  }

  _getNewPosition(enemy) {
    const position = this._x + this._direction * this._v;
    if (this._isLeft(position)) {
      this._isAlive = false;
      return this._r;
    }
    if (this._isRight(position)) {
      this._isAlive = false;
      return this._width - this._r;
    }
    if (this._getIsHit(enemy, position)) {
      this._isAlive = false;
      this._isHit = true;
      console.log('hit');
      return enemy.x - Math.sqrt((enemy.r + this._r)**2 - (enemy.y - this._y)**2) * this._direction;
    }
    return position;
  }

  render(context) {
    context.beginPath();
    context.fillStyle = this._color;
    context.arc(this._x, this._y, this._r, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  move(enemy) {
    this._x = this._getNewPosition(enemy);
  }
}
