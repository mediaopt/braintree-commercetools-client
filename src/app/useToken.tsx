import {
  FC,
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";

import { getClientToken } from "../services";

import { GeneralComponentsProps, ClientTokenResponse } from "../types";

type TokenContextT = {
  clientToken: string;
};

const TokenContext = createContext<TokenContextT>({
  clientToken: "",
});

export const TokenProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({ getClientTokenUrl, paymentId, paymentVersion, children }) => {
  const [clientToken, setClientToken] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const result = (await getClientToken(
          getClientTokenUrl,
          paymentId,
          paymentVersion
        )) as ClientTokenResponse;

        if (result.clientToken) {
          setClientToken(result.clientToken);
        } else {
          setClientToken("");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [paymentId, paymentVersion]);

  const value = useMemo(() => {
    return {
      clientToken,
    };
  }, [clientToken]);

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
