import {useSyncExternalStore} from 'react';
import counter from './counter.js';

export default function Tableau() {
  const count = useSyncExternalStore(counter.subscribe, counter.read).split(';');

  return (
    <div className={'tableau'}>
      <div className={'half'}>
        {count[0].split('').map((sym, i) => (<div className={'tab'} key={`left${i}`}>{sym}</div>))}
      </div>
      <div className={'tab'}>:</div>
      <div className={'half'}>
        {count[1].split('').map((sym, i) => (<div className={'tab'} key={`right${i}`}>{sym}</div>))}
      </div>
    </div>
  );
}