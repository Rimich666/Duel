export class Duel {
  constructor(canvas, wizards) {
    this._wizards = wizards;
    this._context = canvas.getContext('2d');
    this._width = canvas.clientWidth;
    this._height = canvas.clientHeight;
  }
  _render() {

    // background
    this._context.beginPath();
    this._context.fillStyle = '#aeaeae';
    this._context.rect(0, 0, this._width, this._height);
    this._context.fill();
    this._context.closePath();

    this._wizards.forEach((wizard) => {
      wizard.render(this._context);
      wizard.renderSpells(this._context);
    })
  }


  _renderLoop() {
    const reqAnimationId = requestAnimationFrame(() => {
      this._render();
      this._renderLoop()
    });
  }

  _loop() {
    setTimeout(() => {
      this._wizards.forEach((wizard) => {
        wizard.move();
      });
      this._wizards.forEach((wizard) => {
        wizard.moveSpells(this._wizards[(wizard.index - 1) * (-1)]);
      });
      this._loop();
    }, 40);
  }
  start() {
    console.log('Старт дуэль');
    this._loop();
    this._renderLoop();
  }
}
