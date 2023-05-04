import {client} from "braintree-web";

type BraintreeClientT = {
    clientToken: string;
    callback: (...any: any[]) => void;
};

export const useBraintreeClient = ({clientToken, callback}: BraintreeClientT) => {
    
    client.create({
        authorization: clientToken
    }, function(err, clientInstance) {
        if (err) {
            console.error(err);
            return;
        }
        callback(clientInstance);
    });
};

