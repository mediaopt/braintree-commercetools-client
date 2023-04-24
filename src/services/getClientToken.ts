import { makeRequest } from "../api";

import { ClientTokenResponse, ClientTokenRequest } from "../types";

export const getClientToken = async (
  url: string,
  paymentId: string,
  paymentVersion: number
) => {
  try {
    const data: ClientTokenRequest = { paymentId, paymentVersion };

    const result = await makeRequest<ClientTokenResponse, ClientTokenRequest>(
      url,
      "POST",
      data
    );

    return result;
  } catch (error) {
    console.warn(error);
  }
};
