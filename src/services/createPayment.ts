import { makeRequest } from "../api";

import { CreatePaymentResponse } from "../types";

export const createPayment = async (
  sessionKey: string,
  sessionValue: string,
  url: string
) => {
  try {
    const result = await makeRequest<CreatePaymentResponse, {}>(
      sessionKey,
      sessionValue,
      url,
      "GET"
    );

    return result;
  } catch (error) {
    console.warn(error);
  }
};
