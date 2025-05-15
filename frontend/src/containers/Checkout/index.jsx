import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from '../../config/StripeConfig';
import CheckoutForm from '../../components/Stripe/CheckoutForm';
import React from "react";

export function Checkout() {
    const {
        state: { clientSecret },
     } = useLocation();

     if (!clientSecret) {
        return <div>Erro, volte e tente novamente!</div>;
     }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    );
}
