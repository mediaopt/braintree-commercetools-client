import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { hostedFields } from "braintree-web";
import { usePayment } from "../../app/usePayment";
import { useBraintreeClient } from "../../app/useBraintreeClient";

const HOSTED_FIELDS_LABEL = "uppercase text-sm block mb-1.5";
const HOSTED_FIELDS =
  "h-12 box-border w-full p-3 inline-block shadow-none font-semibold text-sm rounded-md border border-violet-50 leading-5 bg-slate-50 mb-3";

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
          <div id="card-number" className={HOSTED_FIELDS}></div>

          <label className={HOSTED_FIELDS_LABEL} htmlFor="cc-name">
            Name
          </label>
          <div id="cc-name" className={HOSTED_FIELDS}></div>

          <label className={HOSTED_FIELDS_LABEL} htmlFor="expiration-date">
            Expiration Date
          </label>
          <div id="expiration-date" className={HOSTED_FIELDS}></div>

          <label className={HOSTED_FIELDS_LABEL} htmlFor="cvv">
            CVV
          </label>
          <div id="cvv" className={HOSTED_FIELDS}></div>

          <div className="block text-center">
            <input
              type="submit"
              className="justify-center align-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600  shadow-sm"
              value="Purchase"
              id="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};
