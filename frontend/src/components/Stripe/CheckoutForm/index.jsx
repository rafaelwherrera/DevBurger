import React, { useState } from "react";
import "../styles.css"
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart(); 
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe ou Elements com falha, tente novamente!");

            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {

            try {

                const products = cartProducts.map((product) => {
                    return {
                        id: product.id,
                        quantity: product.quantity,
                        price: product.price
                    };
                });

                const { status } = await api.post(
                    '/order',
                    { products },
                    {
                        validateStatus: () => true,
                    },
                );
                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,);
                        clearCart();
                    }, 3000);

                    clearCart();
                    toast.success('Pedido Realizado com Sucesso!');
                } else if (status === 409) {
                    toast.error('Falha ao realizar o seu pedido!');
                } else {
                    throw new Error();
                }
            } catch (error) {
                toast.error('Falha no Sistema! Tente Novamente.');
            }
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}