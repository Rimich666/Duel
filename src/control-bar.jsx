import {useRef, useState} from 'react';

export function ControlBar({wizard, type}) {
  const {min, max} = wizard.range[type];
  const [isDown, setIsDown] = useState(false);
  const [left, setLeft] = useState(0);
  const [currentValue, setCurrentValue] = useState(min);
  const button = useRef(null);
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
  const Options = {
    DEFAULT_SCALE_WIDTH:  Math.min(width.current, height.current) / 20 * 3 - 16,
    BUTTON_SIZE: 16,
  };
  const [widthBar] = useState(Options.DEFAULT_SCALE_WIDTH);
  const getX = (x) => {
    if (x < 0) {
      return 0;
    }
    if (x > widthBar) {
      return widthBar;
    }
    return x;
  };

  const mouseMoveHandle = (evt) => {
    if (isDown) {
      const x = getX(evt.clientX - evt.currentTarget.getBoundingClientRect().left - Options.BUTTON_SIZE / 2);
      setCurrentValue(Math.round(((x) / (widthBar) * (max - min)) + min));
      setLeft(x);
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
    <div className={`filter-range__control`} onMouseMove={mouseMoveHandle} onMouseUp={mouseUpHandle} onMouseLeave={mouseLeaveHandle}>
      <div className={`filter-range__scale`} style={{backgroundColor: wizard.color}}>
      </div>
        <button className={`filter-range-toggle`} ref={button}
                style={{left: `${left}px`, backgroundColor: wizard.color}}
                onMouseDown={mouseDownHandle}
        />
    </div>
  );
}
