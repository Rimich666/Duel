import {ControlBar} from './control-bar.jsx';
import {wizards} from './main.jsx';

export default function SettingBlock() {
  return (
    <section className={'range_block'}>
      <div>
        <h4>Скорость</h4>
        <h4>Частота</h4>
      </div>
      {wizards.map((wizard) => (
        <div key={wizard.index} className={'range_block-wizard'}>
          <ControlBar {...{wizard, type: 'speed'}}/>
          <ControlBar {...{wizard, type: 'frequency'}}/>
        </div>))}

    </section>
  );
}
