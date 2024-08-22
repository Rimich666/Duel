import {useRef} from 'react';

export default function Field() {
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);

  return (
    <canvas id={"canvas"} height={Math.min(width.current, height.current) / 4 * 3} width={Math.min(width.current, height.current) / 2}></canvas>
  );
}
