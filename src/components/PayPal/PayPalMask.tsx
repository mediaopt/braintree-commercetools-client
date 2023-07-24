import React, { useEffect, useState } from "react";
import {
  client as braintreeClient,
  paypalCheckout,
  dataCollector,
} from "braintree-web";
import { FlowType } from "paypal-checkout-components";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";

import {
  PayPalProps,
  GeneralPayButtonProps,
  PayPalFundingSourcesProp,
} from "../../types";

import { HOSTED_FIELDS_LABEL, renderMaskButtonClasses } from "../../styles";

type PayPalMaskProps = GeneralPayButtonProps & PayPalProps;

type LimitedVaultedPaymentDetails = {
  email: string;
};

type LimitedVaultedPayment = {
  nonce: string;
  details: LimitedVaultedPaymentDetails;
};

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
  fullWidth,
  buttonText,
}) => {
  const [limitedVaultedPayments, setLimitedVaultedPaymentMethods] = useState<
    LimitedVaultedPayment[]
  >([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [deviceData, setDeviceData] = useState("");

  const {
    handlePurchase,
    paymentInfo,
    clientToken,
    handleGetVaultedPaymentMethods,
  } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  useEffect(() => {
    const filteredPaymentMethods: Array<LimitedVaultedPayment> = [];
    handleGetVaultedPaymentMethods().then((paymentMethods) => {
      paymentMethods.forEach((paymentMethod) => {
        if (paymentMethod.type === "PayPalAccount") {
          filteredPaymentMethods.push({
            nonce: paymentMethod.nonce,
            details: paymentMethod.details as LimitedVaultedPaymentDetails,
          });
        }
      });
      setLimitedVaultedPaymentMethods(filteredPaymentMethods);
    });
  }, [clientToken]);

  useEffect(() => {
    isLoading(true);

    const isVault: boolean = flow === ("vault" as FlowType);

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

        dataCollector.create(
          {
            client: clientInstance,
            paypal: true,
          },
          function (dataCollectorErr, dataCollectorInstance) {
            if (!dataCollectorErr && dataCollectorInstance) {
              setDeviceData(dataCollectorInstance.deviceData);
            }
          }
        );

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

            paypalCheckoutInstance.loadPayPalSDK(
              isVault
                ? { vault: true }
                : {
                    currency: paymentInfo.currency,
                    intent: intent,
                    ...enableFunding,
                  },
              () => {
                const paypal = global.paypal;

                const handleOnApprove = (data: any, actions: any) => {
                  return paypalCheckoutInstance.tokenizePayment(
                    data,
                    function (err: any, payload: any) {
                      handlePurchase(payload.nonce, {
                        deviceData: deviceData,
                        account: {
                          email: payload.details.email,
                        },
                        billing: {
                          firstName: payload.details.firstName,
                          lastName: payload.details.lastName,
                          streetName: payload.details.shippingAddress.line1,
                          streetNumber: payload.details.shippingAddress.line1,
                          city: payload.details.shippingAddress.city,
                          country: payload.details.countryCode,
                          postalCode:
                            payload.details.shippingAddress.postalCode,
                        },
                        shipping: {
                          firstName: payload.details.firstName,
                          lastName: payload.details.lastName,
                          streetName: payload.details.shippingAddress.line1,
                          streetNumber: payload.details.shippingAddress.line1,
                          city: payload.details.shippingAddress.city,
                          country: payload.details.shippingAddress.countryCode,
                          postalCode:
                            payload.details.shippingAddress.postalCode,
                        },
                      });
                    }
                  );
                };
                const handleOnClose = (data: any) => {
                  notify("Info", "PayPal payment cancelled.");
                };
                const handleOnError = (err: any) => {
                  notify("Info", "PayPal payment cancelled.");
                };

                if (isVault) {
                  paypal
                    .Buttons({
                      style: {
                        label: buttonLabel,
                        color: buttonColor,
                      },
                      fundingSource: "paypal",
                      createBillingAgreement: function () {
                        return paypalCheckoutInstance.createPayment({
                          flow: flow,
                          billingAgreementDescription:
                            billingAgreementDescription,
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
                } else {
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

                        onApprove: handleOnApprove,
                        onCancel: handleOnClose,
                        onError: handleOnError,
                      })
                      .render("#paypal-button");
                  });
                }
                isLoading(false);
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

  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedAccount(value);
  };

  const handleVaultedPurchase = async () => {
    isLoading(true);
    await handlePurchase(selectedAccount, {
      deviceData: deviceData,
    });
    isLoading(false);
  };

  return (
    <>
      {!!limitedVaultedPayments.length && (
        <div className="block w-full">
          {limitedVaultedPayments.map((vaultedMethod, index) => {
            return (
              <div
                key={index}
                className="flex gap-x-5 justify-start content-center border p-2 border-gray-300 rounded my-4"
              >
                <input
                  className="w-3 justify-self-center"
                  id={`credit-card-${index}`}
                  type="radio"
                  name="select-credit-card"
                  value={vaultedMethod.nonce}
                  onChange={changeAccount}
                />
                <label
                  htmlFor={`credit-card-${index}`}
                  className="cursor-pointer w-full"
                >
                  <span className={HOSTED_FIELDS_LABEL}>
                    {vaultedMethod.details.email}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      )}

      {selectedAccount !== "" && (
        <div>
          <button
            onClick={handleVaultedPurchase}
            className={`${renderMaskButtonClasses(
              fullWidth ?? false,
              true,
              false
            )} mb-5`}
          >
            {buttonText}
          </button>
        </div>
      )}
      {selectedAccount === "" && <div id="paypal-button"></div>}
    </>
  );
};
