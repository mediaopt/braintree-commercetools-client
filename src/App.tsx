import React from "react"
import './App.css';

import { PayPalCheckout } from './components/PayPalCheckout';
import { PayPal } from './components/PayPal';
import { CreditCard } from './components/CreditCard';

function App() {
  return (
    <div className="App">
      <PayPalCheckout label='PayPalCheckout' />
      <PayPal label='PayPal' />
      <CreditCard label='CreditCard'/>
    </div>
  );
}

export default App;
