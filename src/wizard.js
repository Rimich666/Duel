import {PERIOD_SHOOTING, WIZARD_RADIUS} from './main.jsx';
import {Spell} from "../spell.js";

export class Wizard {
  _r = WIZARD_RADIUS;
  _v = 0;
  _colors = ['#fe0000', '#005cff'];
  constructor(index) {
    this._index = index;
    this._color = this._colors[this._index];
    this._direction = -1;
    this._spells = [];
    this._spellColor = this._color;
    this._cursor = {
      position: 0,
      delta: 0
    }
    this._isInto = false;
  }

  _addSpell() {
    const timeout = this._f ? PERIOD_SHOOTING * 1000 / this._f : 0;
    if (timeout > 0) {
      setTimeout(() => {
        this._spells.push(new Spell(this._x, this._y, Math.floor(this._r / 4), this._spellColor, this._index, this._width));
        this._addSpell();
      }, timeout);
    }
  }

  _xIsIn(x) {
    return !(x > this._x + this._r || x< this._x - this._r);
  }

  get range() {
    return {
      speed: {
        min: 0,
        max: 20
      },
      frequency: {
        min: 0,
        max: 100
      }
    }
  }

  get color() {
    return this._color;
  }

  get r() {
    return this._r;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set speed(speed) {
    this._v = speed;
  }

  set frequency(frequency) {
    this._f = frequency;
    this._addSpell();
  }

  set canvas (canvas) {
    this._height = canvas.clientHeight;
    this._width = canvas.clientWidth;
    this._x = this._width * this._index + (this._r * 2) * (this._index * (-2) + 1);
    this._y = this._height - this._r;
  }

  set cursor ({x, y}) {
    if ((x + y) === 0  || !this._xIsIn(x)) {
      this._cursor.delta = 0;
      this._cursor.position = 0;
      return;
    }
    this._cursor.position = y;
    this._cursor.delta = Math.sqrt(this._r ** 2 - (this._x - x) ** 2);
  }

  render(context) {
    context.beginPath();
    context.fillStyle = this._color;
    context.arc(this._x, this._y, this._r, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  renderSpells(context) {
    this._spells.forEach((spell) => {
      spell.render(context);
    })
  }

  get index() {
    return this._index;
  }

  _isTop(y) {
    return y - this._r <= 0;
  }

  _isBottom(y) {
    return y + this._r >= this._height;
  }

  _getCursor() {
    return this._cursor.position - this._cursor.delta * this._direction;
  }

  _cursorIsForward(position) {
    const realPosition = position * this._direction;
    const cursor = this._getCursor() * this._direction;
    const current = this._y * this._direction;
    return realPosition >= cursor && current < cursor;
  }

  _getNewPosition() {
    const position = this._y + this._direction * this._v;
    if ((position + this._r * this._direction) < 0) {
      return this._r;
    }
    if ((position + this._r * this._direction) > this._height) {
      return this._height - this._r;
    }

    if (this._cursor.position > 0) {
      console.log('position', this._cursor.position, this._color, position);
      if (this._cursorIsForward(position)) {
        this._isInto = true;
        return this._getCursor();
      }
    }

    return position;
  }

  moveSpells(enemy) {
    this._spells = this._spells.filter((spell) => spell.isAlive);
    this._spells.forEach((spell) => {
      spell.move(enemy);
    })
  }

  move() {
    if (this._isTop(this._y)) {
      this._direction = 1;
    }
    if (this._isBottom(this._y)) {
      this._direction = -1;
    }
    this._y = this._getNewPosition();
    if (this._isInto) {
      this._direction = this._direction * (-1);
      this._isInto = false;
    }
  }
}