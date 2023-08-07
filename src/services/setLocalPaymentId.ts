import { makeRequest } from "../api";

export const setLocalPaymentIdRequest = async (
  sessionKey: string,
  sessionValue: string,
  url: string,
  paymentId: string,
  paymentVersion: number,
  localPaymentId: string
) => {
  try {
    const data = {
      paymentId,
      paymentVersion,
      localPaymentId,
    };

    const result = await makeRequest(
      sessionKey,
      sessionValue,
      url,
      "POST",
      data
    );

    return result;
  } catch (error) {
    return false;
  }
};
