import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { hostedFields } from "braintree-web";
import { usePayment } from "../../app/usePayment";
import { useBraintreeClient } from "../../app/useBraintreeClient";
import { mockAddress } from "./addressMockData";
import { useNotifications } from "../../app/useNotifications";

const HOSTED_FIELDS_LABEL = "uppercase text-sm block mb-1.5";
const HOSTED_FIELDS =
  "h-12 box-border w-full inline-block shadow-none font-semibold text-sm rounded-md border border-violet-50 leading-5 bg-slate-50 mb-3";

export const CreditCardMask: React.FC<
  React.PropsWithChildren<{
    fullWidth?: boolean;
    buttonText: string;
    showPostalCode: boolean;
  }>
> = ({ fullWidth = true, buttonText, showPostalCode }) => {
  const { handlePurchase } = usePayment();
  const { notify } = useNotifications();
  const [hostedFieldsCreated, setHostedFieldsCreated] = useState(false);

  const { client, threeDS } = useBraintreeClient();

  const ccFormRef = React.useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!client || !threeDS) return;
    const form = ccFormRef.current;

    let hostedFieldsInputs: object = {
      number: {
        container: "#card-number",
        placeholder: "4111 1111 1111 1111",
      },
      cvv: {
        container: "#cvv",
        placeholder: "123",
      },
      expirationDate: {
        container: "#expiration-date",
        placeholder: "MM/YYYY",
      },
      cardholderName: {
        container: "#cc-name",
        placeholder: "name",
      },
    };

    if (showPostalCode) {
      hostedFieldsInputs = {
        ...hostedFieldsInputs,
        postalCode: {
          container: "#postal-code",
        },
      };
    }

    hostedFields.create(
      {
        client: client,
        styles: {
          input: {
            "font-size": "16px",
            "font-family": "courier, monospace",
            "font-weight": "lighter",
            color: "#ccc",
          },
          ":focus": {
            color: "black",
          },
          ".valid": {
            color: "#8bdda8",
          },
        },
        fields: {
          ...hostedFieldsInputs,
        },
      },
      function (err, hostedFieldsInstance) {
        if (err) {
          notify("Error", "Something went wrong.");
          console.error(err);
          return;
        }

        if (!hostedFieldsInstance || !form) {
          notify("Error", "Credit card fields are not available.");
          return;
        }
        var tokenize = function (event: any) {
          event.preventDefault();

          hostedFieldsInstance.tokenize(function (err, payload) {
            if (err || !payload) {
              notify(
                "Error",
                "Something went wrong. Check your card details and try again."
              );
              return;
            }

            let amount = 500.0;
            let threeDSecureParameters = {
              amount: amount,
              nonce: payload.nonce,
              bin: payload.details.bin,
              email: "test@example.com",
              ...mockAddress,
            };
            threeDS
              .verifyCard(threeDSecureParameters)
              .then(function (response) {
                if (response.threeDSecureInfo.liabilityShifted) {
                  handlePurchase(response.nonce);
                } else if (response.threeDSecureInfo.liabilityShiftPossible) {
                  // @todo liability shift possible - Decide if you want to submit the nonce
                } else {
                  // @todo no liability shift - Decide if you want to submit the nonce
                }
              })
              .catch(function (error) {
                if (error.code.indexOf("THREEDS_LOOKUP") === 0) {
                  if (
                    error.code ===
                    "THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR"
                  ) {
                    notify(
                      "Error",
                      "Payment nonce does not exist or was already used"
                    );
                  } else if (
                    error.code.indexOf("THREEDS_LOOKUP_VALIDATION") === 0
                  ) {
                    notify(
                      "Error",
                      "Validation error - check your input or try a different payment"
                    );
                  } else {
                    notify("Error", "Something went wrong - try again");
                  }
                } else {
                  notify("Error", "Something went wrong - try again");
                }
              });
          });
        };
        form.addEventListener("submit", tokenize, false);
        setHostedFieldsCreated(true);
      }
    );
  }, [client, threeDS]);

  return (
    <>
      <div
        className={classNames({
          "demo-frame": true,
          hidden: !hostedFieldsCreated,
        })}
      >
        <form
          ref={ccFormRef}
          action="/"
          method="post"
          id="cardForm"
          className="m-auto p-8 max-w-screen-md"
        >
          <label className={HOSTED_FIELDS_LABEL} htmlFor="card-number">
            Card Number
          </label>
          <div id="card-number" className={`${HOSTED_FIELDS} px-3`}></div>

          <label className={HOSTED_FIELDS_LABEL} htmlFor="cc-name">
            Name
          </label>
          <div id="cc-name" className={`${HOSTED_FIELDS} p-3`}></div>

          <label className={HOSTED_FIELDS_LABEL} htmlFor="expiration-date">
            Expiration Date
          </label>
          <div id="expiration-date" className={`${HOSTED_FIELDS} p-3`}></div>

          {showPostalCode && (
            <>
              <label className={HOSTED_FIELDS_LABEL} htmlFor="postal-code">
                Postal code
              </label>
              <div id="postal-code" className={`${HOSTED_FIELDS} p-3`}></div>
            </>
          )}

          <label className={HOSTED_FIELDS_LABEL} htmlFor="cvv">
            CVV
          </label>
          <div id="cvv" className={`${HOSTED_FIELDS} p-3`}></div>

          <div className="block text-center">
            <input
              type="submit"
              className={classNames({
                "justify-center align-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600  shadow-sm":
                  true,
                "w-full": fullWidth,
              })}
              value={buttonText}
              id="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};
