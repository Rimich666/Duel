import './App.css'
import SettingBlock from './setting-block.jsx';
import {useEffect, useRef} from "react";
import {Field} from "./field.jsx";
import {Wizard} from "./wizard.js";
import {Duel} from "./duel.js";

function App() {
  const canvas = useRef(null);
  const wizards = Array(2).fill(null).map((_, index) => new Wizard(index));
  useEffect(() => {
    canvas.current.height = canvas.current.clientHeight;
    canvas.current.width = canvas.current.clientWidth;
    wizards.forEach((wizard) => {
      wizard.canvas = {
        clientHeight: canvas.current.clientHeight,
        clientWidth: canvas.current.clientWidth
      }
    })
    new Duel(canvas.current, wizards).start();
  })
  return (
    <main className={'container'}>
      <SettingBlock wizards={wizards}/>
      <Field ref={canvas}/>
    </main>
  )
}

export default App
