import React, { FC, createContext, useMemo, useContext, useState } from "react";

import { LoadingOverlay } from "../components/LoadingOverlay";

type LoaderContextT = {
  isLoading: (active: boolean) => void;
};

const LoaderContext = createContext<LoaderContextT>({
  isLoading: (active: boolean): void => {},
});

export const LoaderProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const value = useMemo(() => {
    const isLoading = (active: boolean) => {
      setShowLoader(active);
    };

    return {
      isLoading,
    };
  }, []);

  return (
    <LoaderContext.Provider value={value}>
      {showLoader && (
        <div className="fixed top-0 bottom-0 z-50 w-full">
          <LoadingOverlay />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
