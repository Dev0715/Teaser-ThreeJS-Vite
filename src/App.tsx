import React, { useEffect, useState } from 'react';
import { Leva } from 'leva';

import Layout from './components/Layout';
import { useAudiate } from './lib/use-audiate';

export default function App() {
  const [audioContextState, isEnabled] = useAudiate();
  const [play, setPlay] = useState(false); // start music
  const [debugValue, setDebug] = useState(true); // show debug panel

  console.log(audioContextState, isEnabled);

  const parentCallback = (play: boolean) => {
    setPlay(!play);
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const debugParam = queryParameters.get('showGUI');

    if (debugParam === 'true') {
      setDebug(false);
    } else {
      setDebug(true);
    }
  }, [window.location.search]);

  return (
    <>
      {/* Debug panel */}
      <Leva hidden={debugValue} />
      {/* Multiple scenes plus overlay */}
      <Layout play={play} parentCallback={parentCallback} />
    </>
  );
}
