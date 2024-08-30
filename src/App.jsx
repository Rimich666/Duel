import './App.css'
import SettingBlock from './setting-block.jsx';
import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import {Field} from "./field.jsx";
import {Duel} from "./duel.js";
import Tableau from "./tableau.jsx";
import colorist from "./colorist.js";
import {Wizard} from "./wizard.js";

function App() {
  const canvas = useRef(null);
  const wizards = Array(2).fill(null).map((_, index) => new Wizard(index));

  const clickHandle = (evt) => {
    colorist.reset();
    const rect = canvas.current.getBoundingClientRect();
    wizards.forEach((wizard) => {
      wizard.clickHandle({x: evt.clientX - rect.x, y: evt.y - rect.y, width: rect.width});
    })
  };

  const mouseMoveHandle = (evt) => {
    const rect = canvas.current.getBoundingClientRect();
    wizards.forEach((wizard) => {
      wizard.cursor = {x: evt.clientX - rect.x, y: evt.y - rect.y, ratio: rect.width};
    })
  };

  const mouseLeaveHandle = () => {
    wizards.forEach((wizard) => {
      wizard.cursor = {x: 0, y: 0};
    })
  }

  useEffect(() => {
    const rect = canvas.current.getBoundingClientRect();
    canvas.current.height = rect.height;
    canvas.current.width = rect.width;
    wizards.forEach((wizard) => {
      wizard.canvas = {
        clientHeight: canvas.current.clientHeight,
        clientWidth: canvas.current.clientWidth
      }
    })

    canvas.current.addEventListener('click', (evt) => clickHandle(evt));
    canvas.current.addEventListener('mousemove', (evt) => mouseMoveHandle(evt));
    canvas.current.addEventListener('mouseleave', (evt) => mouseLeaveHandle(evt));

    new Duel(canvas.current, wizards).start();

  })
  return (
    <main>
      <section className={'container'}>
        <Tableau/>
      </section>
      <section className={'container'}>
        <SettingBlock wizards={wizards}/>
        <Field ref={canvas}/>
      </section>

    </main>
  )
}

export default App
