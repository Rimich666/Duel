import './App.css'
import SettingBlock from './setting-block.jsx';
import {useEffect, useRef, useState} from "react";
import {Field} from "./field.jsx";
import {Wizard} from "./wizard.js";
import {Duel} from "./duel.js";
import Tableau from "./tableau.jsx";
import ColorPicker from "./color-picker.jsx";
import colorist from "./colorist.js";

function App() {
  const canvas = useRef(null);
  const wizards = Array(2).fill(null).map((_, index) => new Wizard(index));
  const mouseMoveHandle = (evt, coordinates) => {
    wizards.forEach((wizard) => {
      wizard.cursor = {x: evt.clientX - coordinates.x, y: evt.y - coordinates.y};
    })
  };

  const mouseLeaveHandle = () => {
    wizards.forEach((wizard) => {
      wizard.cursor = {x: 0, y: 0};
    })
  }

  const clickHandle = (evt, coordinates) => {
    colorist.reset();
    wizards.forEach((wizard) => {
      wizard.clickHandle({x: evt.clientX - coordinates.x, y: evt.y - coordinates.y});
    })
  };

  useEffect(() => {
    const rect = canvas.current.getBoundingClientRect();
    const coordinates = {x: rect.x, y: rect.y};
    canvas.current.height = rect.height;
    canvas.current.width = rect.width;
    wizards.forEach((wizard) => {
      wizard.canvas = {
        clientHeight: canvas.current.clientHeight,
        clientWidth: canvas.current.clientWidth
      }
    })
    canvas.current.addEventListener('click', (evt) => clickHandle(evt, coordinates));
    canvas.current.addEventListener('mousemove', (evt) => mouseMoveHandle(evt, coordinates));
    canvas.current.addEventListener('mouseleave', (evt) => mouseLeaveHandle(evt, coordinates));
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
