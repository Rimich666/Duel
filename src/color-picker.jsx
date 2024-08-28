import {useSyncExternalStore} from "react";
import colorist from "./colorist.js";

export default function ColorPicker() {
  const wizard = useSyncExternalStore(colorist.subscribe, colorist.getRef);
  return(
    <div className={'picker'}>

    </div>);
}
