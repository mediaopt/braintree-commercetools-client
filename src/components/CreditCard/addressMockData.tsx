export const mockAddress = {
  billingAddress: {
    givenName: "Jill", // ASCII-printable characters required, else will throw a validation error
    surname: "Doe", // ASCII-printable characters required, else will throw a validation error
    phoneNumber: "8101234567",
    streetAddress: "555 Smith St.",
    extendedAddress: "#5",
    locality: "Oakland",
    region: "CA", // ISO-3166-2 code
    postalCode: "12345",
    countryCodeAlpha2: "US",
  },
  additionalInformation: {
    workPhoneNumber: "8101234567",
    shippingGivenName: "Jill",
    shippingSurname: "Doe",
    shippingPhone: "8101234567",
    shippingAddress: {
      streetAddress: "555 Smith St.",
      extendedAddress: "#5",
      locality: "Oakland",
      region: "CA", // ISO-3166-2 code
      postalCode: "12345",
      countryCodeAlpha2: "US",
      line3: "",
    },
  },
};
