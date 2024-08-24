import {ControlBar} from './control-bar.jsx';
// import {wizards} from './main.jsx';

export default function SettingBlock({wizards}) {
  return (
    <section className={'settings_block'}>
      {wizards.map((wizard) => (
        <div key={wizard.index} className={'wizard_setting'}>
          <ControlBar {...{wizard, type: 'speed'}}/>
          <ControlBar {...{wizard, type: 'frequency'}}/>
        </div>))}
    </section>
  );
}
