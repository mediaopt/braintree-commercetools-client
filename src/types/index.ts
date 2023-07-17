import React from "react";
import {
  ButtonColorOption,
  ButtonLabelOption,
  FlowType,
} from "paypal-checkout-components";
import {
  ThreeDSecureAdditionalInformation,
  ThreeDSecureBillingAddress,
} from "braintree-web/modules/three-d-secure";

export type ClientTokenRequest = {
  paymentId: string;
  paymentVersion: number;
  braintreeCustomerId?: string;
};

export type GeneralPayButtonProps = {
  fullWidth?: boolean;
  buttonText?: string;
};

export type GeneralComponentsProps = {
  purchaseUrl: string;
  createPaymentUrl: string;
  getClientTokenUrl: string;
  sessionKey: string;
  sessionValue: string;
  purchaseCallback: (result: any) => void;
} & CartInformationProps &
  GeneralPayButtonProps;

export type ClientTokenResponse = {
  clientToken: string;
  paymentVersion: number;
};

export type CreatePaymentResponse = {
  id: string;
  version: number;
  amountPlanned: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
  lineItems: [object]; // @todo add better types maybe?
  shippingMethod: object; // @todo add better types maybe?
  braintreeCustomerId: string;
};

export type TransactionSaleResponse = {
  ok: boolean;
  message: string;
  result: {
    transactionSaleResponse: Record<string, any>;
    paymentVersion: number;
  };
};

export type PaymentInfo = {
  id: string;
  version: number;
  amount: number;
  currency: string;
  lineItems: Array<any>;
  shippingMethod: {};
} & CartInformationProps;

export type CartInformation = {
  account: {
    email: string;
  };
  billing: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: string;
  };
};

export type PayPalFundingSourcesProp = {
  [index: string]: {
    buttonColor?: ButtonColorOption;
    buttonLabel?: ButtonLabelOption;
  };
};

export type PayPalProps = {
  flow: FlowType;
  buttonColor: ButtonColorOption;
  buttonLabel: ButtonLabelOption;
  payLater?: boolean;
  payLaterButtonColor?: ButtonColorOption;
};

export const CartInformationInitial: CartInformation = {
  account: {
    email: "",
  },
  billing: {
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
    postalCode: "",
  },
  shipping: {
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
    postalCode: "",
  },
};

export type CartInformationProps = { cartInformation: CartInformation };

export type GooglePayTypes = {
  environment: google.payments.api.Environment;
  totalPriceStatus: "NOT_CURRENTLY_KNOWN" | "ESTIMATED" | "FINAL";
  googleMerchantId?: string;
  buttonTheme?: google.payments.api.ButtonColor;
  buttonType?: google.payments.api.ButtonType;
  phoneNumberRequired?: boolean;
  billingAddressFormat?: "FULL" | "MIN";
  billingAddressRequired?: boolean;
  acquirerCountryCode: string;
  fullWidth: boolean;
};

export type VenmoTypes = {
  mobileWebFallBack: boolean;
  desktopFlow: "desktopWebLogin" | "desktopQRCode";
  paymentMethodUsage: "multi_use" | "single_use";
  allowNewBrowserTab?: boolean;
  profile_id?: string;
  useTestNonce?: boolean;
  setVenmoUserName: (venmoName: string) => any;
  ignoreBowserSupport?: boolean;
};

export type ApplePayTypes = {
  applePayDisplayName: string;
};

export type GenericError = {
  code: string;
  message: string;
};

export type LoadingOverlayType = {
  loadingText?: string;
  textStyles?: string;
};

export type GeneralACHProps = { mandateText: string };

export type GeneralCreditCardProps = {
  showPostalCode?: boolean;
  showCardHoldersName?: boolean;
  threeDSBillingAddress?: ThreeDSecureBillingAddress;
  threeDSAdditionalInformation?: ThreeDSecureAdditionalInformation;
  email?: string;
  enableVaulting?: boolean;
};

export type LocalPaymentMethodsType = {
  paymentType: any;
  countryCode: any;
  currencyCode: any;
  merchantAccountId: string;
};

type LocalPaymentBancontact = {
  paymentType: "bancontact";
  countryCode: "BE";
  currencyCode: "EUR";
  merchantAccountId: string;
};

type LocalPaymentBLIK = {
  paymentType: "blik";
  countryCode: "PL";
  currencyCode: "PLN";
  merchantAccountId: string;
};
type LocalPaymentEPS = {
  paymentType: "eps";
  countryCode: "AT";
  currencyCode: "EUR";
  merchantAccountId: string;
};
type LocalPaymentGiropay = {
  paymentType: "giropay";
  countryCode: "DE";
  currencyCode: "EUR";
  merchantAccountId: string;
};
type LocalPaymentGrabpay = {
  paymentType: "grabpay";
  countryCode: "SG";
  currencyCode: "SGD";
  merchantAccountId: string;
};
type LocalPaymentIdeal = {
  paymentType: "ideal";
  countryCode: "NL";
  currencyCode: "EUR";
  merchantAccountId: string;
};
type LocalPaymentSofort = {
  paymentType: "sofort";
  countryCode: "AT" | "BE" | "DE" | "IT" | "NL" | "ES" | "GB";
  currencyCode: "EUR" | "GBP";
  merchantAccountId: string;
};
type LocalPaymentMyBank = {
  paymentType: "mybank";
  countryCode: "IT";
  currencyCode: "EUR";
  merchantAccountId: string;
};
type LocalPaymentP24 = {
  paymentType: "p24";
  countryCode: "PL";
  currencyCode: "EUR" | "PL";
  merchantAccountId: string;
};

export type LocalPaymentBancontactType = React.FC<
  GeneralComponentsProps & LocalPaymentBancontact
>;

export type LocalPaymentP24Type = React.FC<
  GeneralComponentsProps & LocalPaymentP24
>;
