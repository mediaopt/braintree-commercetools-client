import React, { useEffect } from "react";
import {
  client as braintreeClient,
  paypalCheckout,
  dataCollector,
} from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";

import {
  PayPalProps,
  GeneralPayButtonProps,
  PayPalFundingSourcesProp,
} from "../../types";

type PayPalMaskProps = GeneralPayButtonProps & PayPalProps;

const FUNDING_SOURCES = ["paypal"];

export const PayPalMask: React.FC<React.PropsWithChildren<PayPalMaskProps>> = ({
  flow,
  buttonLabel,
  buttonColor,
  payLater,
  payLaterButtonColor,
  locale,
  intent,
  commit,
  enableShippingAddress,
  paypalLineItem,
  billingAgreementDescription,
  shippingAddressEditable,
  shippingAddressOverride,
}) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  useEffect(() => {
    isLoading(true);
    const additionalFundingSources: PayPalFundingSourcesProp = {};
    if (payLater) {
      additionalFundingSources["paylater"] = {
        buttonColor: payLaterButtonColor,
      };
    }
    const additionalFundingMethods = Object.keys(
      additionalFundingSources ?? {}
    );
    additionalFundingMethods.map((additionalFundingMethod) => {
      if (!FUNDING_SOURCES.includes(additionalFundingMethod)) {
        FUNDING_SOURCES.push(additionalFundingMethod);
      }
    });

    const enableFunding = additionalFundingMethods.length
      ? {
          "enable-funding": additionalFundingMethods.toString(),
        }
      : {};

    const fundingButtonConfigs: PayPalFundingSourcesProp = {
      paypal: {
        buttonColor: buttonColor,
        buttonLabel: buttonLabel,
      },
      ...(additionalFundingSources ?? {}),
    };

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

            dataCollector.create(
              {
                client: clientInstance,
                paypal: true,
              },
              (dataCollectorErr, dataCollectorInstance) => {
                if (dataCollectorErr) {
                  isLoading(false);
                  notify("Error", "Error in data collector for PayPal.");
                  return;
                }

                paypalCheckoutInstance.loadPayPalSDK(
                  {
                    currency: paymentInfo.currency,
                    intent: intent,
                    ...enableFunding,
                  },
                  () => {
                    const paypal = global.paypal;

                    FUNDING_SOURCES.forEach((fundingSource) => {
                      paypal
                        .Buttons({
                          style: {
                            label:
                              fundingButtonConfigs[fundingSource].buttonLabel,
                            color:
                              fundingButtonConfigs[fundingSource].buttonColor,
                          },
                          fundingSource: fundingSource,
                          createOrder: () => {
                            return paypalCheckoutInstance.createPayment({
                              flow: flow,
                              locale: locale,
                              amount: paymentInfo.amount,
                              currency: paymentInfo.currency,
                              intent: intent,
                              commit: commit,
                              enableShippingAddress: enableShippingAddress,
                              shippingAddressEditable: shippingAddressEditable,
                              paypalLineItem: paypalLineItem,
                              billingAgreementDescription:
                                billingAgreementDescription,
                              shippingAddressOverride: shippingAddressOverride,
                            });
                          },

                          onApprove: (data: any, actions: any) => {
                            return paypalCheckoutInstance.tokenizePayment(
                              data,
                              function (err: any, payload: any) {
                                handlePurchase(payload.nonce, {
                                  deviceData:
                                    dataCollectorInstance?.deviceData ?? false,
                                });
                              }
                            );
                          },

                          onCancel: (data) => {
                            notify("Info", "PayPal payment cancelled.");
                          },

                          onError: (err) => {
                            notify("Info", "PayPal payment cancelled.");
                          },
                        })
                        .render("#paypal-button");
                    });

                    isLoading(false);
                  }
                );
              }
            );
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
    notify,
    payLater,
    payLaterButtonColor,
    commit,
    enableShippingAddress,
    intent,
    isLoading,
    locale,
    paypalLineItem,
    billingAgreementDescription,
    shippingAddressEditable,
    shippingAddressOverride,
  ]);

  return <div id="paypal-button"></div>;
};
