import {wizards} from './main.jsx';

function render() {
  const canvas = document.getElementById("canvas");
  const canvasContext = canvas.getContext("2d");

  const CANVAS_WIDTH = canvas.clientWidth;
  const CANVAS_HEIGHT = canvas.clientHeight;


  // background
  canvasContext.beginPath();
  canvasContext.fillStyle = '#aeaeae';
  canvasContext.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvasContext.fill();
  canvasContext.closePath();

  wizards.forEach((wizard) => {
    wizard.render(canvasContext);
    wizard.renderSpells(canvasContext);
  })
}


export function renderLoop() {
  const reqAnimationId = requestAnimationFrame(() => {
    render();
    renderLoop()
  });
}

let count = 0;

export function loop() {
 setTimeout(() => {
    wizards.forEach((wizard) => {
      wizard.move();
    });
    wizards.forEach((wizard) => {
      wizard.moveSpells(wizards[(wizard.index - 1) * (-1)]);
    });
    loop();
  }, 40);
}

