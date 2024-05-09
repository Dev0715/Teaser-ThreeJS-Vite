import React from 'react';
import { Leva } from 'leva';

import Layout from './components/Layout';
import EnterScreen from './components/EnterScreen';
import { useAudiate } from './hooks/use-audiate';

export const DELAY_TIME = 3000;

export default function App() {
  const [audioContextState, isEnabled] = useAudiate();
  const [play, setPlay] = React.useState(false); // start music
  const [debugValue, setDebug] = React.useState(true); // show debug panel

  console.log(audioContextState, isEnabled);

  React.useEffect(() => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      loader?.classList.add('hide-fade');
    }, DELAY_TIME);
  }, []);

  React.useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const debugParam = queryParameters.get('showGUI');

    setDebug(!(debugParam === 'true'));
  }, [window.location.search]);

  const handlePlay = (play: boolean) => {
    setPlay(play);
  };

  return (
    <>
      <EnterScreen onClick={() => handlePlay(true)} />

      {/* Debug panel */}
      <Leva hidden={debugValue} />

      {/* Multiple scenes plus overlay */}
      <Layout play={play} onPlay={handlePlay} />
    </>
  );
}
