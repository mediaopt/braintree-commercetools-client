import React from "react";
import "./App.css";

import { CreditCard } from "./components/CreditCard";

function App() {
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

  return (
    <div className="App">
      <CreditCard
        createPaymentUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPayment"
        getClientTokenUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/getClientToken"
        purchaseUrl="https://poc-majid-mediaopt.frontastic.dev/frontastic/action/payment/createPurchase"
        sessionKey="frontastic-session"
        sessionValue="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXJ0SWQiOiI3MzkwODUxNS0wOWZlLTQyNTMtYjM1YS02MmQ0MTZhMDkyOWEiLCJ3aXNobGlzdElkIjoiOWY5Nzg2ZDQtMzU3Ni00MjNkLWFiYWYtYWIzY2NjYjYyMmEwIn0.KNuHNyqmqArVad2b4ezmnB30G8z_A4QdIZFPqsPbuBg"
        purchaseCallback={() => {
          console.log("Do something");
        }}
        cartInformation={cartInformation}
      />
    </div>
  );
}

export default App;
