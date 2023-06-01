import React, { FormEventHandler, useEffect, useState } from "react";
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
}) => {
  const { handlePurchase, paymentInfo, clientToken } = usePayment();
  const { notify } = useNotifications();
  const [displayButton, setDisplayButton] = useState(false);
  const [venmoDisabled, setVenmoDisabled] = useState(false);
  const [currentVenmoInstance, setVenmoInstance] = useState<Venmo>();
  const [deviceData, setDeviceData] = useState("");

  const venmoForm = React.useRef<HTMLFormElement>(null);

  const handleVenmoError = (err: any) => {
    if (err.code === "VENMO_CANCELED") {
      notify("Error", "App is not available or user aborted payment flow");
    } else if (err.code === "VENMO_APP_CANCELED") {
      notify("Error", "User canceled payment flow");
    } else {
      console.error("An error occurred:", err.message);
    }
  };

  const handleVenmoSuccess = (payload: any) => {
    // Send payload.nonce to your server.
    console.log("Got a payment method nonce:", payload.nonce);
    // Display the Venmo username in your checkout UI.
    console.log("Venmo user:", payload.details.username);
  };

  const clickVenmoButton = (e: any) => {
    e.preventDefault();
    setVenmoDisabled(true);
    if (!currentVenmoInstance) return;
    // @ts-ignore
    currentVenmoInstance.tokenize(function (tokenizeErr: any, payload: any) {
      setVenmoDisabled(false);

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
          console.error("Error creating client:", clientErr);
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
            console.log("Got device data:", dataCollectorInstance.deviceData);
            setDeviceData(dataCollectorInstance.deviceData);
          }
        );

        let venmoFlowOption =
          desktopFlow === "desktopWebLogin"
            ? { allowDesktopWebLogin: true }
            : { allowDesktop: true };

        if (!allowNewBrowserTab) {
          // @ts-ignore
          venmoFlowOption = { ...venmoFlowOption, allowNewBrowserTab: false };
        }
        if (profile_id) {
          // @ts-ignore
          venmoFlowOption = { ...venmoFlowOption, profile_id: profile_id };
        }

        // Create a Venmo component.
        venmo.create(
          {
            client: clientInstance,
            // @ts-ignore
            mobileWebFallBack: mobileWebFallBack,
            paymentMethodUsage: paymentMethodUsage,
            ...venmoFlowOption,
          },
          function (venmoErr, venmoInstance) {
            if (venmoErr) {
              console.error("Error creating Venmo:", venmoErr);
              return;
            }
            if (!venmoInstance.isBrowserSupported()) {
              console.log("Browser does not support Venmo");
              return;
            }

            setDisplayButton(true);
            setVenmoInstance(venmoInstance);
            if (!allowNewBrowserTab) {
              return;
            }

            if (venmoInstance.hasTokenizationResult()) {
              venmoInstance.tokenize(function (tokenizeErr: any, payload: any) {
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
        {buttonText}
      </button>
    </form>
  );
};
