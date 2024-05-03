import React, { useEffect, useState } from 'react';
import { Leva } from 'leva';

import Layout from './components/Layout';

export default function App() {
  const [play, setPlay] = useState(false); // start music
  const [debugValue, setDebug] = useState(true); // show debug panel

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
      {/* Debug pannel */}
      <Leva hidden={debugValue} />
      {/* Multiple scenes plus overlay */}
      <Layout play={play} parentCallback={parentCallback} />
    </>
  );
}
