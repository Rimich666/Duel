import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {startDuel} from "./start-duel.js";
import {Wizard} from './wizard.js';

export const WIZARD_RADIUS = 20;
export const PERIOD_SHOOTING = 10;

export const SPELL_SPEED = 20;
export const wizards = Array(2).fill(null).map((_, index) => new Wizard(index));

const root = createRoot(document.getElementById('root'));
console.log(window.innerHeight, window.innerWidth);

const rootRender = () => root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

rootRender();

window.onload = () => {
  startDuel();
}
window.addEventListener("resize", () => {
  rootRender();
  startDuel();
});