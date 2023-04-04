import React from "react"
import './App.css';

import { PayPalCheckout } from './components/PayPalCheckout';
import { PayPal } from './components/PayPal';

function App() {
  return (
    <div className="App">
      <PayPalCheckout label='test' />
      <PayPal label='test' />
    </div>
  );
}

export default App;
