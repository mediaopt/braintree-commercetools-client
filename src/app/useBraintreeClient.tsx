import { client } from "braintree-web";
import { useEffect, useState } from "react";
import { usePayment } from "./usePayment";

export const useBraintreeClient = () => {
  const { clientToken } = usePayment();
  const [clientInstance, setClientInstance] = useState(undefined);

  useEffect(() => {
    client.create(
      {
        authorization: clientToken,
      },
      function (err, braintreeClientInstance) {
        if (err) {
          console.error(err);
          return;
        }
        setClientInstance(braintreeClientInstance);
      }
    );
  }, [clientToken]);

  return clientInstance;
};
