import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Wizard} from "./wizard.js";
import {Duel} from "./duel.js";

export const WIZARD_RADIUS = 20;
export const PERIOD_SHOOTING = 10;

export const SPELL_SPEED = 20;
export const WIZARD_COLORS = ['#fe0000', '#005cff'];

export const title = {
  speed: 'Скорость:',
  frequency: 'Частота:'
}

const root = createRoot(document.getElementById('root'));
// export const wizards = Array(2).fill(null).map((_, index) => new Wizard(index));
// export const duel = new Duel(wizards);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
