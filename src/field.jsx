import {forwardRef, useEffect, useRef} from 'react';

export const Field = forwardRef(function Field(props, ref) {
  // const width = useRef(window.innerWidth);
  // const height = useRef(window.innerHeight);
  const mouseMoveHandle = (evt) => {
    // console.log('mouse', evt.clientX, evt.clientY);
  }
  return (
    <canvas
      ref={ref}
      id={"canvas"}
      // height={Math.min(width.current, height.current) / 4 * 3}
      // width={Math.min(width.current, height.current) / 2}
      onMouseMove={mouseMoveHandle}
    />
  );
})
