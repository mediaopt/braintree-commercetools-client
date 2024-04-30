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
    quantity: "2",
    unitAmount: "158.00",
    unitOfMeasure: "unit",
    totalAmount: "316.00",
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

export const baseUrl =
  "https://poc-mediaopt.frontastic.rocks/frontastic/action";

export const requestHeader = {
  "Frontastic-Session":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aXNobGlzdElkIjoiM2NjMzg4ZWMtNTUxMi00NDQ2LWI2MTAtMmM3ZWY5N2VjMTViIiwiY2FydElkIjoiZWJiMmFmNWMtZDBmYy00Njg4LWJkYjctZTk4NmI5OTc1YzQ2In0.Ujy0mrAFIwldmhTIhVVWY95qSJazn5e-B0wU4qa0KoE",
  "Commercetools-Frontend-Extension-Version": "devmajidabbasi",
};

export const params = {
  createPaymentUrl: `${baseUrl}/payment/createPayment`,
  getClientTokenUrl: `${baseUrl}/payment/getClientToken`,
  purchaseUrl: `${baseUrl}/payment/createPurchase`,

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

export const vaultingParams = {
  createPaymentForVault: `${baseUrl}/payment/createPaymentForVault`,
  vaultPaymentMethodUrl: `${baseUrl}/payment/vaultPaymentMethod`,
  isPureVault: true,
};

export const localPaymentParams = {
  saveLocalPaymentIdUrl: `${baseUrl}/payment/setLocalPaymentId`,
  fallbackUrl: "/test",
  fallbackButtonText: "purchase",
  merchantAccountId: "",
};
