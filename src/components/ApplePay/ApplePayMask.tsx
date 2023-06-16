import React, { useEffect } from "react";
import { client as braintreeClient, applePay } from "braintree-web";
import classNames from "classnames";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";
import { GeneralPayButtonProps, ApllePayTypes } from "../../types";

declare const window: any;

type ApplePayMaskProps = ApllePayTypes & GeneralPayButtonProps;

export const ApplePayMask: React.FC<
  React.PropsWithChildren<ApplePayMaskProps>
> = ({ fullWidth, apllePayDisplayName }: ApplePayMaskProps) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  const applePayButtonContainer = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    isLoading(true);

    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        if (clientErr) {
          notify("Error", "Error creating client");
          return;
        }

        applePay.create(
          {
            client: clientInstance,
          },
          function (applePayErr, applePayInstance) {
            if (applePayErr) {
              notify("Error", "Error creating applePayInstance");
              return;
            }

            var paymentRequest = applePayInstance?.createPaymentRequest({
              total: {
                label: apllePayDisplayName,
                amount: paymentInfo.amount.toString(),
              },

              requiredBillingContactFields: ["postalAddress"],
            });

            var session = new window.ApplePaySession(3, paymentRequest);

            session.onvalidatemerchant = function (event: any) {
              applePayInstance?.performValidation(
                {
                  validationURL: event.validationURL,
                  displayName: apllePayDisplayName,
                },
                function (err, merchantSession) {
                  if (err) {
                    notify("Error", "Apple Pay failed to load.");
                    return;
                  }
                  session.completeMerchantValidation(merchantSession);
                }
              );
            };

            session.onpaymentauthorized = function (event: any) {
              applePayInstance?.tokenize(
                {
                  token: event.payment.token,
                },
                function (tokenizeErr, payload: any) {
                  if (tokenizeErr) {
                    notify("Error", "Error tokenizing Apple Pay");

                    session.completePayment(
                      window.ApplePaySession.STATUS_FAILURE
                    );
                    return;
                  }

                  handlePurchase(payload.nonce);

                  session.completePayment(
                    window.ApplePaySession.STATUS_SUCCESS
                  );
                }
              );
            };

            session.begin();
          }
        );
      }
    );
    isLoading(false);
  }, []);

  return (
    <div
      className={classNames({
        "w-full": fullWidth,
      })}
      ref={applePayButtonContainer}
    >
      <div className="apple-pay-button apple-pay-button-black"></div>
    </div>
  );
};
