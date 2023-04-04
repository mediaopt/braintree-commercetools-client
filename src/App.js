var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { PayPalCheckout } from './components/PayPalCheckout';
import { PayPal } from './components/PayPal';
function App() {
    return (_jsxs("div", __assign({ className: "App" }, { children: [_jsx(PayPalCheckout, { label: 'test' }), _jsx(PayPal, { label: 'test' })] })));
}
export default App;
