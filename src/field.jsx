import {forwardRef, useEffect, useRef} from 'react';

export const Field = forwardRef(function Field(props, ref) {
  return (
    <canvas
      ref={ref}
      id={"canvas"}
    />
  );
})
