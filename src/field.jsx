import {forwardRef} from 'react';
import ColorPicker from "./color-picker.jsx";

export const Field = forwardRef(function Field(props, ref) {
  return (
    <div className={'field'}>
      <ColorPicker/>
      <canvas
        ref={ref}
        id={"canvas"}
      />
    </div>
  );
})
