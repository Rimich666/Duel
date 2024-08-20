import {WIZARD_RADIUS} from './main.jsx';

export class Wizard {
  _r = WIZARD_RADIUS;
  _v = 0;
  _colors = ['#fe0000', '#005cff'];
  constructor(index) {
    this._index = index;
    this._color = this._colors[this._index];
  }

  get range() {
    return {
      speed: {
        min: 0,
        max: 20
      },
      frequency: {
        min: 1,
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

  set speed(speed) {
    this._v = speed;
  }

  set frequency(frequency) {
    this._f = frequency;
  }

  set canvas (canvas) {
    this._x = canvas.clientWidth * this._index + (this._r * 2) * (this._index * (-2) + 1);
    this._y = canvas.clientHeight - this._r;
  }

  render(context) {
    context.beginPath();
    context.fillStyle = this._color;
    context.arc(this._x, this._y, this._r, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  get index() {
    return this._index;
  }
}