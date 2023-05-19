import { FC, createContext, useMemo, useContext, useState } from "react";

import { getClientToken, createPayment } from "../services";
import { Result } from "../components/Result";

import {
  GeneralComponentsProps,
  ClientTokenResponse,
  CreatePaymentResponse,
} from "../types";
import { makeTransactionSaleRequest } from "../services/makeTransactionSaleRequest";

type PaymentContextT = {
  gettingClientToken: boolean;
  clientToken: string;
  errorMessage: string;
  handleGetClientToken: () => void;
  handlePurchase: (paymentNonce: string) => void;
};

const PaymentContext = createContext<PaymentContextT>({
  gettingClientToken: false,
  clientToken: "",
  errorMessage: "",
  handleGetClientToken: () => {},
  handlePurchase: (paymentNonce: string) => {},
});

export const PaymentProvider: FC<
  React.PropsWithChildren<GeneralComponentsProps>
> = ({
  createPaymentUrl,
  getClientTokenUrl,
  purchaseUrl,
  sessionKey,
  sessionValue,
  purchaseCallback,
  children,
  cartInformation,
}) => {
  const [gettingClientToken, setGettingClientToken] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultSuccess, setResultSuccess] = useState<boolean>();
  const [resultMessage, setResultMessage] = useState<string>();

  const [clientToken, setClientToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({ id: "", version: 0 });

  const value = useMemo(() => {
    const handleGetClientToken = async () => {
      setGettingClientToken(true);
      try {
        const createPaymentResult = (await createPayment(
          sessionKey,
          sessionValue,
          createPaymentUrl,
          cartInformation
        )) as CreatePaymentResponse;

        if (createPaymentResult.id && createPaymentResult.version) {
          const clientTokenresult = (await getClientToken(
            sessionKey,
            sessionValue,
            getClientTokenUrl,
            createPaymentResult.id,
            createPaymentResult.version
          )) as ClientTokenResponse;

          setPaymentInfo({
            id: createPaymentResult.id,
            version: clientTokenresult.paymentVersion,
          });

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

    const handlePurchase = async (paymentNonce: string) => {
      const requestBody = {
        paymentVersion: paymentInfo.version,
        paymentId: paymentInfo.id,
        paymentMethodNonce: paymentNonce,
      };

      const response = await makeTransactionSaleRequest(
        sessionKey,
        sessionValue,
        purchaseUrl,
        requestBody
      );

      const { message, success } = response.result.transactionSaleResponse;
      setResultSuccess(success);
      setResultMessage(message);

      setShowResult(true);
      if (purchaseCallback && success !== false) purchaseCallback(response);
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
    <PaymentContext.Provider value={value}>
      {showResult ? (
        <Result success={resultSuccess} message={resultMessage} />
      ) : (
        children
      )}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
