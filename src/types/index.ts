export type ClientTokenRequest = {
  paymentId: string;
  paymentVersion: number;
};

export type GeneralComponentsProps = {
  getClientTokenUrl: string;
} & ClientTokenRequest;

export type ClientTokenResponse = {
  clientToken: string;
};
