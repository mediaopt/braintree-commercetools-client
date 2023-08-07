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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI3OTVhNzkzMC1mZjQ3LTRiZGQtODJhYS03ZDdkNjhmYWZiYjciLCJ3aXNobGlzdElkIjoiNzBlOTliZjMtZDE4My00NmU2LTk4YjUtNjIzNTEyNGNiODRmIn0.CoD0oygSe3ioUE9y0D3KF-f9CAUVSieQ99fBPFcL0r0",
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
