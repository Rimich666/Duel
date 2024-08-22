import {wizards} from "./main.jsx";
import {loop, renderLoop} from "./duel.js";

export function startDuel() {
  console.log('Старт дуэль');
  const size = Math.min(window.innerWidth, window.innerHeight);
  wizards.forEach((wizard) => {
    wizard.canvas = {
      clientHeight: size / 4 * 3,
      clientWidth: size / 2
    }
  })

  loop();
  renderLoop();
}