export type ClientTokenRequest = {
  paymentId: string;
  paymentVersion: number;
};

export type GeneralComponentsProps = {
  purchaseUrl: string;
  createPaymentUrl: string;
  getClientTokenUrl: string;
  sessionKey: string;
  sessionValue: string;
  purchaseCallback: (result: any) => void;
  cartInformation: CartInformation;
  fullWidth?: boolean;
  buttonText?: string;
};

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
};

export type PaymentInfo = {
  id: string;
  version: number;
  amount: number;
  currency: string;
  lineItems: Array<any>;
  shippingMethod: {};
  cartInformation: CartInformation;
};

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

export type GooglePayTypes = {
  environment: "TEST" | "PRODUCTION";
  totalPriceStatus: "NOT_CURRENTLY_KNOWN" | "ESTIMATED" | "FINAL";
  googleMerchantId?: string;
  buttonTheme?: "DARK" | "LIGHT";
  buttonType?:
    | "BOOK"
    | "BUY"
    | "CHECKOUT"
    | "DONATE"
    | "ORDER"
    | "PAY"
    | "PLAIN"
    | "SUBSCRIBE";
  phoneNumberRequired?: boolean;
  billingAddressFormat?: "FULL" | "MIN";
  billingAddressRequired?: boolean;
};
