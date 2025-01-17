async function createAudio(url: string) {
  // Fetch audio data and create a buffer source
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.webkitAudioContext)();

  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res),
  );
  source.loop = true;
  source.start(0);

  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 32;
  source.connect(analyser);
  analyser.connect(gain);

  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);
  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      if ((data === undefined) == false) {
        analyser.getByteFrequencyData(data);
      }

      // Calculate a frequency average
      return data.reduce((prev, cur) => prev + cur / data.length, 0);
    },
  };
}

export default createAudio;
