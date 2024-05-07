import React, { useEffect, useState } from 'react';
import { Leva } from 'leva';

import Layout from './components/Layout';
import { useAudiate } from './hooks/use-audiate';

export const DELAY_TIME = 3000;

export default function App() {
  const [audioContextState, isEnabled] = useAudiate();
  const [play, setPlay] = useState(false); // start music
  const [debugValue, setDebug] = useState(true); // show debug panel

  console.log(audioContextState, isEnabled);

  useEffect(() => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      loader?.classList.add('hide');
    }, DELAY_TIME);
  }, []);

  const handlePlay = (play: boolean) => {
    setPlay(play);
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const debugParam = queryParameters.get('showGUI');

    setDebug(!(debugParam === 'true'));
  }, [window.location.search]);

  return (
    <>
      {/* Debug panel */}
      <Leva hidden={debugValue} />

      {/* Multiple scenes plus overlay */}
      <Layout play={play} onPlay={handlePlay} />
    </>
  );
}
