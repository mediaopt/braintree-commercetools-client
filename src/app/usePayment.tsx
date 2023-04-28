import { FC, createContext, useMemo, useContext, useState } from "react";

import { getClientToken, createPayment } from "../services";

import {
  GeneralComponentsProps,
  ClientTokenResponse,
  CreatePaymentResponse,
} from "../types";

type PaymentContextT = {
  gettingClientToken: boolean;
  clientToken: string;
  errorMessage: string;
  handleGetClientToken: () => void;
  handlePurchase: () => void;
};

const PaymentContext = createContext<PaymentContextT>({
  gettingClientToken: false,
  clientToken: "",
  errorMessage: "",
  handleGetClientToken: () => {},
  handlePurchase: () => {},
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  children,
}) => {
  const [gettingClientToken, setGettingClientToken] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const value = useMemo(() => {
    const handleGetClientToken = async () => {
      setGettingClientToken(true);
      try {
        const createPaymentResult = (await createPayment(
          sessionKey,
          sessionValue,
          createPaymentUrl
        )) as CreatePaymentResponse;

        if (createPaymentResult.id && createPaymentResult.version) {
          const clientTokenresult = (await getClientToken(
            sessionKey,
            sessionValue,
            getClientTokenUrl,
            createPaymentResult.id,
            createPaymentResult.version
          )) as ClientTokenResponse;

          if (clientTokenresult.clientToken) {
            setClientToken(clientTokenresult.clientToken);
            setGettingClientToken(false);
            return;
          }
        }

        setErrorMessage("There is an error in getting client token!");
      } catch (error) {
        setErrorMessage("Authentication Error!");
        console.error(error);
      }
      setGettingClientToken(false);
    };

    const handlePurchase = async () => {
      console.log(purchaseUrl);
    };

    return {
      gettingClientToken,
      clientToken,
      errorMessage,
      handleGetClientToken,
      handlePurchase,
    };
  }, [clientToken, gettingClientToken, errorMessage]);

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
