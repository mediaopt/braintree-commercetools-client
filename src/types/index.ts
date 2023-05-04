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
};

export type ClientTokenResponse = {
  clientToken: string;
};

export type CreatePaymentResponse = {
  id: string;
  version: number;
};

export type CreditCardMaskProps = {
  clientToken: string;
};
