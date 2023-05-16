import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { hostedFields } from "braintree-web";
import { usePayment } from "../../app/usePayment";
import { useBraintreeClient } from "../../app/useBraintreeClient";
import { mockAddress } from "./addressMockData";

const HOSTED_FIELDS_LABEL = "uppercase text-sm block mb-1.5";
const HOSTED_FIELDS =
  "h-12 box-border w-full inline-block shadow-none font-semibold text-sm rounded-md border border-violet-50 leading-5 bg-slate-50 mb-3";
const PAY_BUTTON_TEXT_FALLBACK = "Purchase";

export const CreditCardMask: React.FC<
  React.PropsWithChildren<{ fullWidth?: boolean; buttonText?: string }>
> = ({ fullWidth = true, buttonText = PAY_BUTTON_TEXT_FALLBACK }) => {
  const { handlePurchase } = usePayment();
  const [hostedFieldsCreated, setHostedFieldsCreated] = useState(false);

  const { client, threeDS } = useBraintreeClient();

  const ccFormRef = React.useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!client || !threeDS) return;
    const form = ccFormRef.current;

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
          postalCode: {
            container: "#postal-code",
          },
        },
      },
      function (err, hostedFieldsInstance) {
        if (err) {
          console.error(err);
          return;
        }

        if (!hostedFieldsInstance || !form) {
          console.error("no hosted fields or form available");
          return;
        }
        var tokenize = function (event: any) {
          event.preventDefault();

          hostedFieldsInstance.tokenize(function (err, payload) {
            if (err || !payload) {
              alert(
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
                // Send response.nonce to your server for use in your integration
                // The 3D Secure Authentication ID can be found
                //  at response.threeDSecureInfo.threeDSecureAuthenticationId
                if (response.threeDSecureInfo.liabilityShifted) {
                  // Liability has shifted to bank, proceed with nonce
                  handlePurchase(response.nonce);
                } else if (response.threeDSecureInfo.liabilityShiftPossible) {
                  // Liability may still be shifted
                  // Decide if you want to submit the nonce
                  /**
                   * user failed 3D Secure authentication.
                   * In this situation, the card brands recommend asking the user for another form of payment.
                   * However, if you have server-side risk assessment processes that allow for it, you can still use the new nonce to create a transaction.
                   * If you want to use a nonce that did not pass 3D Secure authentication, you need to set the required option to false in your server integration.
                   */
                  alert("liability shift possible - todo implement handling of this case");
                } else {
                  // Liability has not shifted and will not shift
                  // Decide if you want to submit the nonce
                  /**
                   * If both of the above values are false then this card was ineligible for 3D Secure.
                   * You can continue to create the transaction with the new nonce.
                   * However, liability shift will not apply to this transaction.
                   * This case may be useful if you would like to ask the user for additional verification (AVS, etc).
                   */
                  alert("no liability shift - todo implement handling of this case");
                }
              })
              .catch(function (error) {
                console.error(error);
                if (error.code.indexOf("THREEDS_LOOKUP") === 0) {
                  // an error occurred during the initial lookup request
                  if (
                    error.code ===
                    "THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR"
                  ) {
                    // either the passed payment method nonce does not exist
                    // or it was already consumed before the lookup call was made
                    console.error("nonce error");
                  } else if (
                    error.code.indexOf("THREEDS_LOOKUP_VALIDATION") === 0
                  ) {
                    // a validation error occurred
                    // likely some non-ascii characters were included in the billing
                    // address given name or surname fields, or the cardholdername field
                    // Instruct your user to check their data and try again
                    console.error(
                      "check data and try again. If it continues, try other card or payment method"
                    );
                  } else {
                    // an unknown lookup error occurred
                    console.error("unknown lookup error");
                  }
                } else {
                  // some other kind of error
                  console.error("something went wrong");
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

          <label className={HOSTED_FIELDS_LABEL} htmlFor="postal-code">
            Postal code
          </label>
          <div id="postal-code" className={`${HOSTED_FIELDS} p-3`}></div>

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
