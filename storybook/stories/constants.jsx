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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiIwMTQwNGE1Zi03NWRjLTRlZmMtOWE0NS0wMTM2ZDIxNGQwMjEiLCJ3aXNobGlzdElkIjoiMThiYzQwYzEtYzBmYi00NWI4LThlNWItOGQxZTEzYmEyYzJiIn0._90v7QM4Vr0251GmwFNbLBO7Mx0wuIdBsZe8WESbjwE",
  purchaseCallback: (result, options) => {
    console.log("purchaseCallback", result, options);
  },
  fullWidth: true,
  buttonText: "Pay €X",
  cartInformation: cartInformation,
};
