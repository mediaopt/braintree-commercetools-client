import { getClientToken } from "./getClientToken";

jest.mock("../api/request", () => {
  return {
    makeRequest: <ResponseType, T>(
      sessionKey: string,
      sessionValue: string,
      url: string,
      method?: string,
      data?: T
    ) => {
      switch (sessionKey) {
        case "fail":
          return new Promise((resolve) => {
            process.nextTick(() => {
              try {
                throw Error("");
              } catch (e) {
                return;
              }
            });
          });
          break;
        default:
          return new Promise<ResponseType>((resolve, reject) => {
            process.nextTick(() => {
              resolve({
                clientToken: "test",
                paymentVersion: 1,
              } as ResponseType);
            });
          });
      }
    },
  };
});

test("getting clientToken", () => {
  expect.assertions(2);
  return getClientToken("", "", "getClientToken", "", 1).then((result) => {
    expect(result).toHaveProperty("clientToken");
    expect(result).toHaveProperty("paymentVersion");
  });
});

test("error on make request", () => {
  expect.assertions(1);
  return getClientToken("fail", "", "", "", 1).then((result) => {
    expect(result).toBeEmpty();
  });
});
