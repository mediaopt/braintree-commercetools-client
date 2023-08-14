const cartInformation = {
  account: {
    email: "test@test.com",
  },
  billing: {
    firstName: "John",
    lastName: "Smith",
    streetName: "Hochstraße",
    streetNumber: "37",
    city: "Berlin",
    country: "DE",
    postalCode: "12045",
  },
  shipping: {
    firstName: "John",
    lastName: "Smith",
    streetName: "Hochstraße",
    streetNumber: "37",
    city: "Berlin",
    country: "DE",
    postalCode: "12045",
  },
};

export const params = {
  createPaymentUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/createPayment`,
  getClientTokenUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/getClientToken`,
  purchaseUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/createPurchase`,
  sessionKey: "frontastic-session",
  sessionValue:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJkMmFmYjAwZC1lNGY3LTQyOWQtYTcwMS1lNjQ0NDM3ZGFkYWEiLCJ3aXNobGlzdElkIjoiMzcwZjY3NGYtY2Y3MS00ZmI3LWExYTYtNjk0M2QzOWE2MzI2In0.nkHRQhMEQ2z26OAf0OCJkrb5M_2_mwyXDKIpZnY0wF0",
  purchaseCallback: (result, options) => {
    console.log("purchaseCallback", result, options);
  },
  fullWidth: true,
  buttonText: "Pay €X",
  cartInformation: cartInformation,
};

export const localPaymentParams = {
  saveLocalPaymentIdUrl: `https://poc-mediaopt.frontastic.dev/frontastic/action/payment/setLocalPaymentId`,
  fallbackUrl: "/test",
  fallbackButtonText: "purchase",
  merchantAccountId: "",
};
