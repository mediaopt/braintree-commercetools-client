import React, { useEffect, useState } from "react";
import {
  client as braintreeClient,
  venmo,
  Venmo,
  dataCollector,
} from "braintree-web";

import { usePayment } from "../../app/usePayment";
import { useNotifications } from "../../app/useNotifications";

import { VenmoTypes } from "../../types";
import classNames from "classnames";

type VenmoMaskType = VenmoTypes & { fullWidth?: boolean; buttonText: string };

export const VenmoMask: React.FC<React.PropsWithChildren<VenmoMaskType>> = ({
  paymentMethodUsage,
  desktopFlow,
  mobileWebFallBack,
  allowNewBrowserTab = true,
  profile_id,
  fullWidth = true,
  buttonText,
  useTestNonce,
}: VenmoMaskType) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const [displayButton, setDisplayButton] = useState(false);
  const [venmoDisabled, setVenmoDisabled] = useState(false);
  const [currentVenmoInstance, setVenmoInstance] = useState<Venmo>();
  const [deviceData, setDeviceData] = useState("");

  const venmoForm = React.useRef<HTMLFormElement>(null);

  const testPayload = {
    nonce: "fake-venmo-account-nonce",
    detail: { username: "VenmoJoe" },
  };

  const handleVenmoError = (err: any) => {
    if (err.code === "VENMO_CANCELED") {
      notify("Error", "App is not available or user aborted payment flow");
    } else if (err.code === "VENMO_APP_CANCELED") {
      notify("Error", "User canceled payment flow");
    } else {
      notify("Error", err.message);
    }
  };

  const handleVenmoSuccess = (payload: any) => {
    handlePurchase(payload.nonce);
    // Display the Venmo username in your checkout UI.
    // @todo implement the comment
    console.log("Venmo user:", payload.details.username);
  };

  const clickVenmoButton = (e: any) => {
    e.preventDefault();
    setVenmoDisabled(true);
    if (!currentVenmoInstance) return;

    currentVenmoInstance.tokenize({}, (tokenizeErr: any, payload: any) => {
      setVenmoDisabled(false);

      if (useTestNonce) {
        handleVenmoSuccess(testPayload);
        return;
      }

      if (tokenizeErr) {
        handleVenmoError(tokenizeErr);
      } else {
        handleVenmoSuccess(payload);
      }
    });
  };

  useEffect(() => {
    braintreeClient.create(
      {
        authorization: clientToken,
      },
      function (clientErr, clientInstance) {
        if (clientErr) {
          notify("Error", "Error creating client" + clientErr.message);
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

            // At this point, you should access the deviceData value and provide it
            // to your server, e.g. by injecting it into your form as a hidden input.
            // @todo implement comment
            console.log("Got device data:", dataCollectorInstance.deviceData);
            setDeviceData(dataCollectorInstance.deviceData);
          }
        );

        let venmoFlowOption: any =
          desktopFlow === "desktopWebLogin"
            ? { allowDesktopWebLogin: true }
            : { allowDesktop: true };

        if (!allowNewBrowserTab) {
          venmoFlowOption = { ...venmoFlowOption, allowNewBrowserTab: false };
        }
        if (profile_id) {
          venmoFlowOption = { ...venmoFlowOption, profile_id: profile_id };
        }

        venmo.create(
          {
            client: clientInstance,
            mobileWebFallBack: mobileWebFallBack,
            paymentMethodUsage: paymentMethodUsage,
            ...venmoFlowOption,
          },
          function (venmoErr, venmoInstance) {
            if (venmoErr) {
              notify("Error", "Error creating Venmo:" + venmoErr.message);
              return;
            }
            if (!venmoInstance.isBrowserSupported()) {
              notify("Error", "Browser does not support Venmo");
              // return; @todo enable the return again
            }

            setDisplayButton(true);
            setVenmoInstance(venmoInstance);
            if (!allowNewBrowserTab) {
              return;
            }

            if (venmoInstance.hasTokenizationResult()) {
              venmoInstance.tokenize(function (tokenizeErr: any, payload: any) {
                if (useTestNonce) {
                  handleVenmoSuccess(testPayload);
                  return;
                }
                if (tokenizeErr) {
                  handleVenmoError(tokenizeErr);
                } else {
                  handleVenmoSuccess(payload);
                }
              });
              return;
            }
          }
        );
      }
    );
  }, [
    paymentInfo,
    clientToken,
    paymentMethodUsage,
    desktopFlow,
    mobileWebFallBack,
  ]);

  return (
    <form onSubmit={clickVenmoButton} ref={venmoForm}>
      <button
        disabled={venmoDisabled}
        type="submit"
        className={classNames({
          "justify-center align-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600  shadow-sm":
            true,
          "w-full": fullWidth,
        })}
        id="submit"
      >
        venmo: {buttonText}
      </button>
    </form>
  );
};
