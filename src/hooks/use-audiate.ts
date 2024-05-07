import { useState, useEffect, useRef, useCallback } from 'react';
import {
  isAudioContextSupported as _isAudioContextSupported,
  check,
} from 'audiate';

const CHECK_INTERVAL = 500;

export const useAudiate = (): [AudioContextState, boolean] => {
  const [audioContextState, setAudioContextState] =
    useState<AudioContextState>();

  const [isAudioContextSupported, setAudioContextSupport] = useState(
    _isAudioContextSupported(),
  );

  const checkInterval = useRef<NodeJS.Timeout>();

  const handleUnlock = useCallback((): void => {
    setAudioContextState(check());

    if (audioContextState === 'running') {
      document.removeEventListener('click', handleUnlock);
      clearInterval(checkInterval.current);
    }
  }, [audioContextState]);

  useEffect(() => {
    try {
      setAudioContextState(check());
    } catch (error) {
      console.error(error);
      setAudioContextSupport(false);
      return;
    }

    document.addEventListener('click', handleUnlock);

    checkInterval.current = setInterval(() => {
      setAudioContextState(check());

      if (audioContextState === 'running') {
        clearInterval(checkInterval.current);
        document.removeEventListener('click', handleUnlock);
      }
    }, CHECK_INTERVAL);

    return (): void => {
      document.removeEventListener('click', handleUnlock);
      clearInterval(checkInterval.current);
    };
  }, [audioContextState, handleUnlock]);

  return [audioContextState as AudioContextState, isAudioContextSupported];
};
