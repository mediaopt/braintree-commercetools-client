import React, {useEffect} from "react";
import {CreditCardMaskProps} from "../../types";
import {client as braintreeClient, hostedFields} from "braintree-web";
import "./styling.css";

export const CreditCardMask: React.FC<React.PropsWithChildren<CreditCardMaskProps>> = ({clientToken, children}) => {

    const ccFormRef = React.useRef<HTMLFormElement>(null);
    clientToken = 'sandbox_g42y39zw_348pk9cgf3bgyw2b';
    useEffect(() => {
        const form = ccFormRef.current;

        braintreeClient.create({
            authorization: clientToken
        }, function(err, clientInstance) {
            if (err) {
                console.error(err);
                return;
            }
            createHostedFields(clientInstance);
        });

        function createHostedFields(clientInstance:any) {
            hostedFields.create({
                client: clientInstance,
                styles: {
                    'input': {
                        'font-size': '16px',
                        'font-family': 'courier, monospace',
                        'font-weight': 'lighter',
                        'color': '#ccc'
                    },
                    ':focus': {
                        'color': 'black'
                    },
                    '.valid': {
                        'color': '#8bdda8'
                    }
                },
                fields: {
                    number: {
                        container: '#card-number',
                        placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                        container: '#cvv',
                        placeholder: '123'
                    },
                    expirationDate: {
                        container: '#expiration-date',
                        placeholder: 'MM/YYYY'
                    },
                    cardholderName: {
                        container: '#cc-name',
                        placeholder: 'name'
                    }
                }
            }, function (err, hostedFieldsInstance) {
                if (err) {
                    console.error(err);
                    return;
                }
                if (!hostedFieldsInstance || !form) {
                    return;
                }
                var tokenize = function (event:any) {
                    event.preventDefault();

                    hostedFieldsInstance.tokenize(function (err, payload) {
                        if (err) {
                            alert('Something went wrong. Check your card details and try again.');
                            return;
                        }

                        alert('Submit your nonce (' + payload?.nonce + ') to your server here!');
                    });
                };

                form.addEventListener('submit', tokenize, false);
            });
        }
    }, [clientToken])


    return (<>
        <div className="demo-frame">
            <form ref={ccFormRef} action="/" method="post" id="cardForm">
                <label className="hosted-fields--label" htmlFor="card-number">Card Number</label>
                <div id="card-number" className="hosted-field"></div>

                <label className="hosted-fields--label" htmlFor="expiration-date">Expiration Date</label>
                <div id="expiration-date" className="hosted-field"></div>

                <label className="hosted-fields--label" htmlFor="cvv">CVV</label>
                <div id="cvv" className="hosted-field"></div>

                <label className="hosted-fields--label" htmlFor="cc-name">Name</label>
                <div id="cc-name" className="hosted-field"></div>

                <div className="button-container">
                    <input type="submit" className="button button--small button--green" value="Purchase" id="submit"/>
                </div>
            </form>
        </div>
    </>);
};