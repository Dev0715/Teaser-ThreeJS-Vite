import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Leva } from 'leva';

export default function App() {
  const [play, setPlay] = useState(false); // start music
  const [debugValue, setDebug] = useState(true); // show debug panel

  const parentCallback = (play) => {
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
  });

  return (
    <>
      {/* Debug pannel */}
      <Leva hidden={debugValue} />
      {/* Multiple scenes plus overlay */}
      <Layout play={play} parentCallback={parentCallback} />
    </>
  );
}
