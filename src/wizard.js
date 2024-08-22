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
  }

  _addSpell() {
    const timeout = this._f ? PERIOD_SHOOTING * 1000 / this._f : 0;
    console.log(!!this._f, timeout);
    if (timeout > 0) {
      setTimeout(() => {
        this._spells.push(new Spell(this._x, this._y, Math.floor(this._r / 4), this._spellColor, this._index, this._width));
        this._addSpell();
      }, timeout);
    }
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

  render(context) {
    context.beginPath();
    context.fillStyle = this._color;
    context.arc(this._x, this._y, this._r, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  renderSpells(context) {
    this._spells.forEach((spell) => {
      console.log(spell);
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

  _getNewPosition() {
    const position = this._y + this._direction * this._v;
    if ((position + this._r * this._direction) < 0) {
      return this._r;
    }
    if ((position + this._r * this._direction) > this._height) {
      return this._height - this._r;
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
  }
}