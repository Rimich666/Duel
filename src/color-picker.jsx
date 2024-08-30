import {useEffect, useRef, useSyncExternalStore} from "react";
import colorist from "./colorist.js";

export default function ColorPicker() {
  const wizard = useSyncExternalStore(colorist.subscribe, colorist.getRef);
  const input = useRef(null);
  if (wizard) {
    input.current.style.left = `${wizard.x}px`;
    input.current.style.top = `${wizard.y}px`;
    input.current.value = wizard.spellColor;
    const left = input.current.getBoundingClientRect().left;
    input.current.click();
  }
  const inputHandle = (evt) => {
    wizard.spellColor = evt.currentTarget.value;
  }
  return(
    <input
      type={'color'}
      ref={input}
      className={'visually-hidden'}
      onInput={inputHandle}
    ></input>
  )
}
