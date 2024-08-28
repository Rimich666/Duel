import {useEffect, useRef, useState} from 'react';
import {title} from "./main.jsx";

export function ControlBar({wizard, type}) {
  const {min, max} = wizard.range[type];
  const [isDown, setIsDown] = useState(false);
  const [left, setLeft] = useState(0);
  const [currentValue, setCurrentValue] = useState(min);
  const button = useRef(null);
  const scale = useRef(null);
  const control = useRef(null);
  const [lengthBar, setLengthBar] = useState(0);
  const [controlPoints, setControlPoints] = useState({
    left: 0,
    delta: 0,
    scale0: 0
  });

  useEffect(() => {
    setLengthBar(scale.current.offsetHeight);
    controlPoints.scale0 = scale.current.getBoundingClientRect().bottom;
    controlPoints.delta = control.current.getBoundingClientRect().bottom - (controlPoints.scale0 + button.current.offsetHeight / 2);
    setLeft(controlPoints.delta);
  }, []);

  const getX = (x) => {
    if (x < 0) {
      return 0;
    }
    if (x > lengthBar) {
      return lengthBar;
    }
    return x;
  };

  const mouseMoveHandle = (evt) => {
    if (isDown) {
      const x = getX(controlPoints.scale0 - evt.clientY);
      setCurrentValue(Math.round(((x) / (lengthBar) * (max - min)) + min));
      setLeft(x + controlPoints.delta);
    }
  }
  const mouseDownHandle = () => {
    setIsDown(true);
  };

  const endDrag = () => {
    if (!isDown) {
      return;
    }
    setIsDown(false);
    wizard[type] = currentValue;
  };

  const mouseUpHandle = () => {
    endDrag();
  };

  const mouseLeaveHandle = () => {
    endDrag();
  };

  return(
    <aside
      className={`range_control`}
      onMouseMove={mouseMoveHandle}
      onMouseUp={mouseUpHandle}
      onMouseLeave={mouseLeaveHandle}
      ref={control}
    >
      <div className={`range_scale`} ref={scale}>
      </div>
        <button className={`range_toggle`} ref={button}
                style={{bottom: `${left}px`, backgroundColor: wizard.color}}
                onMouseDown={mouseDownHandle}
                title={`${title[type]} ${currentValue}`}
        />
    </aside>
  );
}
