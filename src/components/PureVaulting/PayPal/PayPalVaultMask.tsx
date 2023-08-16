import React, { useEffect } from "react";
import { client as braintreeClient, paypalCheckout } from "braintree-web";

import { usePayment } from "../../../app/usePayment";
import { useNotifications } from "../../../app/useNotifications";
import { useLoader } from "../../../app/useLoader";

import { PayPalProps, GeneralPayButtonProps } from "../../../types";

type PayPalMaskProps = GeneralPayButtonProps & PayPalProps;

export const PayPalVaultMask: React.FC<
  React.PropsWithChildren<PayPalMaskProps>
> = ({
  flow,
  buttonLabel,
  buttonColor,
  locale,
  intent,
  commit,
  shape,
  size,
  tagline,
  height,
  billingAgreementDescription,
  enableShippingAddress,
  shippingAddressEditable,
  shippingAddressOverride,
}) => {
  const { paymentInfo, clientToken, handlePureVault } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  useEffect(() => {
    isLoading(true);

    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        if (clientErr) {
          isLoading(false);
          notify("Error", "Error creating client.");
          return;
        }

        paypalCheckout.create(
          {
            client: clientInstance,
          },
          (paypalCheckoutErr, paypalCheckoutInstance) => {
            if (paypalCheckoutErr) {
              isLoading(false);
              notify("Error", "Error in paypal checkout.");
              return;
            }

            paypalCheckoutInstance.loadPayPalSDK({ vault: true }, () => {
              const paypal = global.paypal;

              const handleOnApprove = (data: any, actions: any) => {
                return paypalCheckoutInstance.tokenizePayment(
                  data,
                  function (err: any, payload: any) {
                    if (err) {
                      notify("Error", err.message);
                      return;
                    }
                    handlePureVault(payload.nonce);
                  }
                );
              };
              const handleOnClose = (data: any) => {
                notify("Info", "PayPal payment cancelled.");
              };
              const handleOnError = (err: any) => {
                notify("Info", "PayPal payment cancelled.");
              };

              paypal
                .Buttons({
                  style: {
                    label: buttonLabel,
                    color: buttonColor,
                    shape,
                    size,
                    tagline,
                    height,
                  },
                  fundingSource: "paypal",
                  createBillingAgreement: function () {
                    return paypalCheckoutInstance.createPayment({
                      flow: flow,
                      billingAgreementDescription: billingAgreementDescription,
                      enableShippingAddress: enableShippingAddress,
                      shippingAddressEditable: shippingAddressEditable,
                      shippingAddressOverride: shippingAddressOverride,
                    });
                  },

                  onApprove: handleOnApprove,
                  onCancel: handleOnClose,
                  onError: handleOnError,
                })
                .render("#paypal-button");

              isLoading(false);
            });
          }
        );
      }
    );
  }, [
    paymentInfo,
    clientToken,
    buttonColor,
    buttonLabel,
    flow,
    commit,
    enableShippingAddress,
    intent,
    isLoading,
    locale,
    billingAgreementDescription,
    shippingAddressEditable,
    shippingAddressOverride,
    shape,
    size,
    tagline,
    height,
  ]);

  return <div id="paypal-button"></div>;
};
