import React, { useEffect, useState } from "react";
import {
  client as braintreeClient,
  dataCollector,
  usBankAccount,
} from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";
import { useLoader } from "../../app/useLoader";

import { GeneralPayButtonProps, CartInformationProps } from "../../types";

import {
  HOSTED_FIELDS_LABEL,
  HOSTED_FIELDS,
  renderMaskButtonClasses,
} from "../../styles";

type AccountType = "" | "checking" | "savings";
type OwnershipType = "" | "personal" | "business";
type BankDetails = {
  accountNumber: string;
  routingNumber: string;
  accountType: AccountType;
  ownershipType: OwnershipType;
  billingAddress: {
    streetAddress: string;
    extendedAddress: string;
    locality: string;
    region: string;
    postalCode: string;
  };
  firstName?: string;
  lastName?: string;
  businessName?: string;
};

type ACHMaskProps = CartInformationProps & GeneralPayButtonProps;

export const ACHMask: React.FC<React.PropsWithChildren<ACHMaskProps>> = ({
  fullWidth = true,
  buttonText,
  cartInformation,
}: ACHMaskProps) => {
  const { handlePurchase, clientToken } = usePayment();
  const { notify } = useNotifications();
  const { isLoading } = useLoader();

  const [deviceData, setDeviceData] = useState("");

  const [accountNumber, setAccountNumber] = useState<string>("");
  const [routingNumber, setRoutingNumber] = useState<string>("");
  const [accountType, setAccountType] = useState<AccountType>("");
  const [ownershipType, setOwnershipType] = useState<OwnershipType>("");
  const [businessName, setBusinessName] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [extendedAddress, setExtendedAddress] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  useEffect(() => {
    const { firstName, lastName, streetName, streetNumber, postalCode } =
      cartInformation.shipping;
    setFirstName(firstName);
    setLastName(lastName);
    setStreetAddress(`${streetName} ${streetNumber}`);
    setPostalCode(postalCode);
  }, [cartInformation]);

  let formButtonDisabled =
    !accountNumber ||
    !routingNumber ||
    !accountType ||
    !ownershipType ||
    !streetAddress ||
    !extendedAddress ||
    !locality ||
    !region ||
    !postalCode;

  if (ownershipType === "business") {
    formButtonDisabled = formButtonDisabled || !businessName;
  } else {
    formButtonDisabled = formButtonDisabled || !firstName || !lastName;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formButtonDisabled) return;
    isLoading(true);

    let bankDetails: BankDetails = {
      accountNumber,
      routingNumber,
      accountType,
      ownershipType,
      billingAddress: {
        streetAddress,
        extendedAddress,
        locality,
        region,
        postalCode,
      },
    };

    if (ownershipType === "personal") {
      bankDetails.firstName = firstName;
      bankDetails.lastName = lastName;
    } else {
      bankDetails.businessName = businessName;
    }

    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        if (clientErr) {
          notify("Error", `Error creating client ${clientErr.message}`);
          isLoading(false);
          return;
        }

        dataCollector.create(
          {
            client: clientInstance,
            paypal: true,
          },
          function (dataCollectorErr, dataCollectorInstance) {
            if (dataCollectorErr || !dataCollectorInstance) {
              return;
            }
            setDeviceData(dataCollectorInstance.deviceData);
          }
        );

        usBankAccount.create(
          {
            client: clientInstance,
          },
          function (usBankAccountErr, usBankAccountInstance) {
            if (usBankAccountErr) {
              notify(
                "Error",
                "There was an error creating the USBankAccount instance."
              );
              isLoading(false);
              throw usBankAccountErr;
            }

            usBankAccountInstance.tokenize(
              {
                bankDetails: bankDetails,
                mandateText:
                  'By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.',
              },
              function (tokenizeErr: any, tokenizedPayload: any) {
                if (tokenizeErr) {
                  notify(
                    "Error",
                    `There was an error tokenizing the bank details, ${tokenizeErr}`
                  );
                  isLoading(false);
                  throw tokenizeErr;
                }

                handlePurchase(tokenizedPayload.nonce, {
                  deviceData: deviceData,
                });
              }
            );
          }
        );

        isLoading(false);
      }
    );
  };

  return (
    <form className="m-auto p-8 max-w-screen-md" onSubmit={handleSubmit}>
      <label className={HOSTED_FIELDS_LABEL} htmlFor="routing-number">
        Routing Number
      </label>
      <input
        type="text"
        id="routing-number"
        className={`${HOSTED_FIELDS} px-3`}
        value={routingNumber}
        onChange={({ target }) => setRoutingNumber(target.value)}
        required
      />

      <label className={HOSTED_FIELDS_LABEL} htmlFor="account-number">
        Account Number
      </label>
      <input
        type="text"
        id="account-number"
        className={`${HOSTED_FIELDS} px-3`}
        value={accountNumber}
        onChange={({ target }) => setAccountNumber(target.value)}
        required
      />

      <label className={HOSTED_FIELDS_LABEL} htmlFor="account-type">
        Account Type
      </label>
      <select
        id="account-type"
        className={`${HOSTED_FIELDS} px-3`}
        value={accountType}
        onChange={({ target }) => setAccountType(target.value as AccountType)}
        required
      >
        <option value="">Select</option>
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
      </select>

      <label className={HOSTED_FIELDS_LABEL} htmlFor="ownership-number">
        Ownership Type
      </label>
      <select
        id="ownership-type"
        className={`${HOSTED_FIELDS} px-3`}
        value={ownershipType}
        onChange={({ target }) =>
          setOwnershipType(target.value as OwnershipType)
        }
        required
      >
        <option value="">Select</option>
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </select>

      {ownershipType === "business" && (
        <>
          <label className={HOSTED_FIELDS_LABEL} htmlFor="business-name">
            Business Name
          </label>
          <input
            type="text"
            id="business-name"
            className={`${HOSTED_FIELDS} px-3`}
            value={businessName}
            onChange={({ target }) => setBusinessName(target.value)}
            required
          />
        </>
      )}

      {ownershipType === "personal" && (
        <div className="flex gap-3">
          <div className="flex-1">
            <label className={HOSTED_FIELDS_LABEL} htmlFor="first-name">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className={`${HOSTED_FIELDS} px-3`}
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className={HOSTED_FIELDS_LABEL} htmlFor="last-name">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className={`${HOSTED_FIELDS} px-3`}
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
              required
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <label className={HOSTED_FIELDS_LABEL} htmlFor="street-address">
            Street Address
          </label>
          <input
            type="text"
            id="street-address"
            className={`${HOSTED_FIELDS} px-3`}
            value={streetAddress}
            onChange={({ target }) => setStreetAddress(target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className={HOSTED_FIELDS_LABEL} htmlFor="extended-address">
            Extended Address
          </label>
          <input
            type="text"
            id="extended-address"
            className={`${HOSTED_FIELDS} px-3`}
            value={extendedAddress}
            onChange={({ target }) => setExtendedAddress(target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className={HOSTED_FIELDS_LABEL} htmlFor="locality">
            Locality
          </label>
          <input
            type="text"
            id="locality"
            className={`${HOSTED_FIELDS} px-3`}
            value={locality}
            onChange={({ target }) => setLocality(target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className={HOSTED_FIELDS_LABEL} htmlFor="region">
            Region
          </label>
          <input
            type="text"
            id="region"
            className={`${HOSTED_FIELDS} px-3`}
            value={region}
            onChange={({ target }) => setRegion(target.value)}
            required
          />
        </div>
      </div>

      <label className={HOSTED_FIELDS_LABEL} htmlFor="postal-code">
        Postal Code
      </label>
      <input
        type="text"
        id="postal-code"
        className={`${HOSTED_FIELDS} px-3`}
        value={postalCode}
        onChange={({ target }) => setPostalCode(target.value)}
        required
      />

      <div className="block text-center">
        <input
          type="submit"
          className={renderMaskButtonClasses(
            fullWidth,
            !formButtonDisabled,
            formButtonDisabled
          )}
          value={buttonText}
          id="submit"
        />
      </div>
    </form>
  );
};
