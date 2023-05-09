import { makeRequest } from "../api";

export const makeTransactionSaleRequest = async (
    sessionKey: string,
    sessionValue: string,
    url: string,
    data: object
) => {
    try {
        const result = await makeRequest<any, any>(
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
