import { useCallback, useEffect, useState } from 'react';

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from './requests';

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.target);
      const launchDate = new Date(data.get('launch-day'));
      const mission = data.get('mission-name');
      const rocket = data.get('rocket-name');
      const destination = data.get('planets-selector');
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        destination,
      });

      // TODO: Set success based on response.
      // so the response is something I don't know yet but we do know it is success
      // since response.ok is true
      // we can do similar thing with abortLaunch
      const success = response.ok;
      if (success) {
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
          onSuccessSound();
        }, 800);
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onSuccessSound, onFailureSound]
  );

  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunch(id);

      // TODO: Set success based on response.
      // if the response of delete operation is true, => success
      const success = response.ok;
      if (success) {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onAbortSound, onFailureSound]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
