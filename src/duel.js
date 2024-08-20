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
    wizard.canvas = canvas;
    wizard.render(canvasContext);
  })
}


export function renderLoop() {
  const reqAnimationId = requestAnimationFrame(() => {
     render();
    // renderLoop()
  });
}

function loop() {
    setTimeout(() => {
        player = solution(player, platforms, audioContext, analyser);
        if (player.y > 0) {
            loop();
        }
    }, 5);
}

