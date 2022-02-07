import { DependencyList, useEffect, useState } from "react";

import { Nullable } from "@mo-id/typescript-toolbelt";
import { useBoolean } from "./useBoolean";

export interface UseApi<
  Result,
  Dependencies extends DependencyList = DependencyList
> {
  isLoading: boolean;
  hasError: boolean;
  error: Nullable<Error>;
  data: Nullable<Result>;
  callApi: (...args: Dependencies) => void;
}

export interface IUseApiOptions<Result> {
  initialData?: Nullable<Result>;
  initialError?: Nullable<Error>;
  fetchWhen?: () => boolean | Promise<boolean>;
}

export function useApi<
  Result = any,
  Dependencies extends DependencyList = DependencyList
>(
  handler: (...args: Dependencies) => Promise<Result>,
  dependencies: Dependencies,
  options?: IUseApiOptions<Result>
): UseApi<Result, Dependencies> {
  const { value: isInitialRender, setFalse: setAsRendered } = useBoolean(true);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(
    options?.initialError ?? null
  );
  const [data, setData] = useState<Nullable<Result>>(
    options?.initialData ?? null
  );

  function callApi(...dependencies: Dependencies) {
    handler(...dependencies)
      .then((data: Result) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    async function performApiCall() {
      setLoading(true);
      setError(null);
      if (options?.fetchWhen) {
        const shouldFetch = options.fetchWhen();
        if (shouldFetch instanceof Promise) {
          await shouldFetch;
        }
        if (shouldFetch) {
          callApi(...dependencies);
        }
      } else {
        callApi(...dependencies);
      }
    }

    /**
     * Se vengono forniti i dati iniziali dall'esterno, la prima chiamata API
     * bisogna saltarla perché abbiamo già il risultato, probabilmente arrivato
     * da una chiamata server-server.
     *
     * Contrassegnando il "primo render" dell'hook, ci assicuriamo che tutte le
     * le esecuzioni successive dell'effetto dovute al change delle dependencies
     * effettuino correttamente la chiamata all'API.
     */
    if ((options?.initialData || options?.initialError) && isInitialRender) {
      setAsRendered();
    } else {
      performApiCall();
    }
  }, dependencies);

  return {
    isLoading,
    hasError: Boolean(error),
    error,
    data,
    callApi,
  };
}
