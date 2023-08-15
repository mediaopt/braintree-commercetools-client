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

const paypalLineItemUndefinedValues = {
  unitTaxAmount: undefined,
  description: undefined,
  productCode: undefined,
  url: undefined,
};

const lineItems = [
  {
    quantity: "10",
    unitAmount: "100.00",
    name: "test name",
    kind: "debit",
    ...paypalLineItemUndefinedValues,
  },
  {
    quantity: "10",
    unitAmount: "100.00",
    name: "test name",
    kind: "debit",
    ...paypalLineItemUndefinedValues,
  },
];

const shipping = {
  firstName: "Jane",
  lastName: "Doe",
};

export const params = {
  createPaymentUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/createPayment`,
  getClientTokenUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/getClientToken`,
  purchaseUrl: `https://poc-mediaopt.frontastic.io/frontastic/action/payment/createPurchase`,
  sessionKey: "frontastic-session",
  sessionValue:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiJhODhiYzhmZS1iNzA2LTQzM2YtYTBkMS1kODUwMzk1MTg4MGYiLCJ3aXNobGlzdElkIjoiNmM5MmU4MDItYWU2Yi00MDgxLTllNzItNzAxM2YyZTljYjQ5In0.cRzoVt9pqimSGaPh_jC7_bULzHODah8FEcLQdKFEK34",
  purchaseCallback: (result, options) => {
    console.log("purchaseCallback", result, options);
  },
  fullWidth: true,
  buttonText: "Pay €X",
  cartInformation: cartInformation,
  useKount: false,
  lineItems: lineItems,
  shipping: shipping,
};

export const localPaymentParams = {
  saveLocalPaymentIdUrl: `https://poc-mediaopt.frontastic.dev/frontastic/action/payment/setLocalPaymentId`,
  fallbackUrl: "/test",
  fallbackButtonText: "purchase",
  merchantAccountId: "",
};
