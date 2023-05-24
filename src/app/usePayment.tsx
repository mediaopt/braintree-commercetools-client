import { FC, createContext, useMemo, useContext, useState } from "react";

import { getClientToken, createPayment } from "../services";
import { Result } from "../components/Result";

import {
  GeneralComponentsProps,
  ClientTokenResponse,
  CreatePaymentResponse,
  PaymentInfo,
} from "../types";
import { makeTransactionSaleRequest } from "../services/makeTransactionSaleRequest";
import { useNotifications } from "./useNotifications";

type PaymentContextT = {
  gettingClientToken: boolean;
  clientToken: string;
  errorMessage: string;
  handleGetClientToken: () => void;
  handlePurchase: (paymentNonce: string) => void;
  paymentInfo: PaymentInfo;
};

const PaymentContext = createContext<PaymentContextT>({
  gettingClientToken: false,
  clientToken: "",
  errorMessage: "",
  handleGetClientToken: () => {},
  handlePurchase: (paymentNonce: string) => {},
  paymentInfo: { version: 0, id: "", amount: 0 },
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
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    version: 0,
    id: "",
    amount: 0,
  });

  const { notify } = useNotifications();

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
            amount: createPaymentResult.amountPlanned.centAmount,
          });

          if (clientTokenresult.clientToken) {
            setClientToken(clientTokenresult.clientToken);
            setGettingClientToken(false);
            return;
          }
        }

        notify("Error", "There is an error in getting client token!");
      } catch (error) {
        notify("Error", "Authentication Error!");
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

      if (response.ok === false) {
        notify("Error", response.message);
        return;
      }

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
      paymentInfo,
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
