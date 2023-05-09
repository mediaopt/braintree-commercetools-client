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
  purchaseCallback: () => void;
};

export type ClientTokenResponse = {
  clientToken: string;
};

export type CreatePaymentResponse = {
  id: string;
  version: number;
};
