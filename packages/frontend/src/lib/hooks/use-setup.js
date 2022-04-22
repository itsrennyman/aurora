import * as React from "react";
import { client } from "../client";

export function useSetup() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [setupDone, setSetupDone] = React.useState(false);

  React.useEffect(() => {
    const isFlagPresent = localStorage.getItem("aurora_setup_done");

    if (isFlagPresent) {
      setSetupDone(true);
      setIsLoading(false);
    } else {
      client
        .get("/setup")
        .catch(() => {
          localStorage.setItem("aurora_setup_done", 1);
          setSetupDone(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return { isLoading, setupDone };
}
