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
    name: "Product",
    kind: "debit",
    quantity: "6",
    unitAmount: "1.00",
    unitOfMeasure: "unit",
    totalAmount: "6.00",
    taxAmount: "0.00",
    discountAmount: "0.00",
    productCode: "54321",
    commodityCode: "98765",
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
  taxAmount: "0.00",
  shippingAmount: "0.00",
  discountAmount: "0.00",
  shippingMethodId: "da416140-39bf-4677-8882-8b6cab23d981",
};

export const localPaymentParams = {
  saveLocalPaymentIdUrl: `https://poc-mediaopt.frontastic.dev/frontastic/action/payment/setLocalPaymentId`,
  fallbackUrl: "/test",
  fallbackButtonText: "purchase",
  merchantAccountId: "",
};
