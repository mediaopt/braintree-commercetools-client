# Braintree client app

In here we explain how to use the client app and get payment methods to work.

## General properties

Each payment component takes a set of props that will be the same for everything. They are as follow:
- **createPaymentUrl**: string  
    foo
- **getClientTokenUrl**: string  
    foo
- **purchaseUrl**: string  
    foo
- **purchaseCallback**: function  
    foo
- **sessionValue**: string  
    the session value of the CoFe app to be able to connect to the cart
- **sessionKey**: string  
    the key for the session to be used in conjunction with the session value
- **fullWidth**: boolean  
    defaults to true
- **buttonText**: string  
    foo
- **cartInformation**: object  
  account: {
  email: string;
  };
  billing: {
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
  };
  shipping: {
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
  };
## Payment specific properties
In addition, each payment component comes with its own specific properties.

### ApplePay
### CreditCard
- **showPostalCode**: boolean  
  Show field for postal code in credit card mask
- **showCardHoldersName**: boolean
    Show field for name in credit card mask
- **threeDSBillingAddress**: object
    foo
- **threeDSAdditionalInformation**: object
    Show field for name in credit card mask
- **email**: string  
    customers email address

### GooglePay
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo
- **text**: string  
  foo

  environment: google.payments.api.Environment;
  totalPriceStatus: "NOT_CURRENTLY_KNOWN" | "ESTIMATED" | "FINAL";
  googleMerchantId?: string;
  buttonTheme?: google.payments.api.ButtonColor;
  buttonType?: google.payments.api.ButtonType;
  phoneNumberRequired?: boolean;
  billingAddressFormat?: "FULL" | "MIN";
  billingAddressRequired?: boolean;
  acquirerCountryCode: string;
### PayPal
- **text**: string  
  foo

  flow: FlowType;
  buttonColor: ButtonColorOption;
  buttonLabel: ButtonLabelOption;
  payLater?: boolean;
  payLaterButtonColor?: ButtonColorOption;
### Venmo
- **text**: string  
  foo

  mobileWebFallBack: boolean;
  desktopFlow: "desktopWebLogin" | "desktopQRCode";
  paymentMethodUsage: "multi_use" | "single_use";
  allowNewBrowserTab?: boolean;
  profile_id?: string;
  useTestNonce?: boolean;
  setVenmoUserName: (venmoName: string) => any;
  ignoreBowserSupport?: boolean;
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

