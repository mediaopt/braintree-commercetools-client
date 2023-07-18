import { makeRequest } from "../api";

import { AchVaultRequest, AchVaultResponse } from "../types";

export const getAchVaultToken = async (
  sessionKey: string,
  sessionValue: string,
  url: string,
  paymentMethodNonce: string
) => {
  try {
    const data: AchVaultRequest = {
      paymentMethodNonce,
    };

    const result = await makeRequest<AchVaultResponse, AchVaultRequest>(
      sessionKey,
      sessionValue,
      url,
      "POST",
      data
    );

    return result;
  } catch (error) {
    console.warn(error);
  }
};
