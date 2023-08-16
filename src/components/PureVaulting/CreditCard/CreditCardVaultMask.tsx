import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { hostedFields } from "braintree-web";

import { useBraintreeClient } from "../../../app/useBraintreeClient";
import { usePayment } from "../../../app/usePayment";
import { useNotifications } from "../../../app/useNotifications";
import { useLoader } from "../../../app/useLoader";
import { HostedFieldsHostedFieldsFieldName } from "braintree-web/modules/hosted-fields";

import { GeneralPayButtonProps, GeneralCreditCardProps } from "../../../types";

import {
  HOSTED_FIELDS_LABEL,
  HOSTED_FIELDS,
  renderMaskButtonClasses,
} from "../../../styles";

type CreditCardMaskProps = GeneralPayButtonProps & GeneralCreditCardProps;

export const CreditCardVaultMask: React.FC<
  React.PropsWithChildren<CreditCardMaskProps>
> = ({ fullWidth = true, buttonText, showPostalCode, showCardHoldersName }) => {
  const { handlePureVault } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();
  const [hostedFieldsCreated, setHostedFieldsCreated] = useState(false);
  const [emptyInputs, setEmptyInputs] = useState<boolean>(true);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const { client } = useBraintreeClient();

  const ccFormRef = React.useRef<HTMLFormElement>(null);
  const ccNumberRef = React.useRef<HTMLDivElement>(null);
  const ccNameRef = React.useRef<HTMLDivElement>(null);
  const ccCvvRef = React.useRef<HTMLDivElement>(null);
  const ccPostalRef = React.useRef<HTMLDivElement>(null);
  const ccExpireRef = React.useRef<HTMLDivElement>(null);

  const borderClassToggle: Array<string> = ["border-2", "border-rose-600"];

  const FieldKeyMap: {
    [index: string]: React.RefObject<HTMLDivElement>;
  } = {
    number: ccNumberRef,
    cvv: ccCvvRef,
    expirationDate: ccExpireRef,
    cardholderName: ccNameRef,
    postalCode: ccPostalRef,
  };

  useEffect(() => {
    if (!client) return;
    isLoading(true);
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
    };

    if (showPostalCode) {
      hostedFieldsInputs = {
        ...hostedFieldsInputs,
        postalCode: {
          container: "#postal-code",
        },
      };
    }

    if (showCardHoldersName) {
      hostedFieldsInputs = {
        ...hostedFieldsInputs,
        cardholderName: {
          container: "#cc-name",
          placeholder: "name",
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
          ".invalid": {
            color: "#DE7976",
          },
        },
        fields: {
          ...hostedFieldsInputs,
        },
      },
      function (err, hostedFieldsInstance) {
        if (err) {
          isLoading(false);
          notify("Error", "Something went wrong.");
          console.error(err);
          return;
        }

        if (!hostedFieldsInstance || !form) {
          isLoading(false);
          notify("Error", "Credit card fields are not available.");
          return;
        }
        setHostedFieldsCreated(true);
        hostedFieldsInstance.on("notEmpty", function (event) {
          let isEmpty = false;
          let fieldsKey: HostedFieldsHostedFieldsFieldName;
          for (fieldsKey in event.fields) {
            isEmpty = isEmpty || event.fields[fieldsKey].isEmpty;
          }
          setEmptyInputs(isEmpty);
        });
        hostedFieldsInstance.on("empty", function (event) {
          setEmptyInputs(true);
        });
        hostedFieldsInstance.on("validityChange", function (event) {
          let isValid = true;
          let fieldsKey: HostedFieldsHostedFieldsFieldName;
          for (fieldsKey in event.fields) {
            let validField =
              event.fields[fieldsKey].isValid ||
              event.fields[fieldsKey].isPotentiallyValid;
            isValid = isValid && validField;
            borderClassToggle.map((classToggle) =>
              FieldKeyMap[fieldsKey].current?.classList.toggle(
                classToggle,
                !validField
              )
            );
          }
          setInvalidInput(!isValid);
        });

        var tokenize = function (event: any) {
          event.preventDefault();

          isLoading(true);

          hostedFieldsInstance.tokenize(function (err, payload) {
            if (err || !payload) {
              console.log(err);
              isLoading(false);
              notify(
                "Error",
                "Something went wrong. Check your card details and try again."
              );
              return;
            }

            handlePureVault(payload.nonce);
          });
        };
        form.addEventListener("submit", tokenize, false);
        isLoading(false);
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
          <div
            ref={ccNumberRef}
            id="card-number"
            className={`${HOSTED_FIELDS} px-3`}
          ></div>

          {showCardHoldersName && (
            <>
              <label className={HOSTED_FIELDS_LABEL} htmlFor="cc-name">
                Name
              </label>
              <div
                ref={ccNameRef}
                id="cc-name"
                className={`${HOSTED_FIELDS} p-3`}
              ></div>
            </>
          )}

          <label className={HOSTED_FIELDS_LABEL} htmlFor="expiration-date">
            Expiration Date
          </label>
          <div
            ref={ccExpireRef}
            id="expiration-date"
            className={`${HOSTED_FIELDS} p-3`}
          ></div>

          {showPostalCode && (
            <>
              <label className={HOSTED_FIELDS_LABEL} htmlFor="postal-code">
                Postal code
              </label>
              <div
                ref={ccPostalRef}
                id="postal-code"
                className={`${HOSTED_FIELDS} p-3`}
              ></div>
            </>
          )}

          <label className={HOSTED_FIELDS_LABEL} htmlFor="cvv">
            CVV
          </label>
          <div ref={ccCvvRef} id="cvv" className={`${HOSTED_FIELDS} p-3`}></div>

          <div className="block text-center">
            <input
              disabled={emptyInputs && invalidInput}
              type="submit"
              className={renderMaskButtonClasses(
                fullWidth,
                !(emptyInputs && invalidInput),
                emptyInputs || invalidInput
              )}
              value={buttonText}
              id="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};
