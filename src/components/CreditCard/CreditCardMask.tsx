import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { hostedFields } from "braintree-web";
import "./styling.css";
import { usePayment } from "../../app/usePayment";
import { useBraintreeClient } from "../../app/useBraintreeClient";

export const CreditCardMask: React.FC<React.PropsWithChildren> = () => {
  const { handlePurchase } = usePayment();
  const [hostedFieldsCreated, setHostedFieldsCreated] = useState(false);

  const client = useBraintreeClient();

  const ccFormRef = React.useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!client) return;
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
            if (err) {
              alert(
                "Something went wrong. Check your card details and try again."
              );
              return;
            }
            if (payload?.nonce) {
              handlePurchase(payload.nonce);
            } else {
              console.error("no payment nonce");
            }
          });
        };
        form.addEventListener("submit", tokenize, false);
        setHostedFieldsCreated(true);
      }
    );
  }, [client]);

  return (
    <>
      <div
        className={classNames({
          "demo-frame": true,
          hidden: !hostedFieldsCreated,
        })}
      >
        <form ref={ccFormRef} action="/" method="post" id="cardForm">
          <label className="hosted-fields--label" htmlFor="card-number">
            Card Number
          </label>
          <div id="card-number" className="hosted-field"></div>

          <label className="hosted-fields--label" htmlFor="cc-name">
            Name
          </label>
          <div id="cc-name" className="hosted-field"></div>

          <label className="hosted-fields--label" htmlFor="expiration-date">
            Expiration Date
          </label>
          <div id="expiration-date" className="hosted-field"></div>

          <label className="hosted-fields--label" htmlFor="cvv">
            CVV
          </label>
          <div id="cvv" className="hosted-field"></div>

          <div className="button-container">
            <input
              type="submit"
              className="button button--small button--green"
              value="Purchase"
              id="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};
