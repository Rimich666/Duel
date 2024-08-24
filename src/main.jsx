import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const WIZARD_RADIUS = 20;
export const PERIOD_SHOOTING = 10;

export const SPELL_SPEED = 20;

export const title = {
  speed: 'Скорость:',
  frequency: 'Частота:'
}

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
