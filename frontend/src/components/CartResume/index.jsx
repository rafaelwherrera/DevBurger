import React, { useEffect, useState } from 'react';
import { ButtonCart } from '../ButtonCart';
import { Container } from './styles';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax, setDeliveryTax] = useState(0);
    const [cep, setCep] = useState('');
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
    const navigate = useNavigate();
    const { cartProducts, clearCart } = useCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc;
        }, 0);
        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    const calculateDeliveryTax = async (cleanedCep) => {
        try {
            const response = await api.get(`/delivery/${cleanedCep}`);

            let deliveryTaxFromApi = response.data.deliveryTax;

            if (typeof deliveryTaxFromApi === 'number' && !isNaN(deliveryTaxFromApi)) {
                setDeliveryTax(deliveryTaxFromApi);
            } else {
                toast.error("Erro ao calcular a taxa de entrega.");
                setDeliveryTax(0);
            }

            setDeliveryOptions(response.data.deliveryOptions);
        } catch (error) {
            toast.error("Erro ao calcular a taxa de entrega.");
            setDeliveryTax(0);
            setDeliveryOptions([]);
        }
    };

    useEffect(() => {
        const cleanedCep = cep.replace(/\D/g, '');

        if (cleanedCep.length === 8) {
            calculateDeliveryTax(cleanedCep);
        } else {
            setDeliveryTax(0);

            if (cleanedCep.length > 0 && cleanedCep.length < 8) {
                const timeout = setTimeout(() => {
                    toast.error("CEP inválido!");
                }, 1000);
                return () => clearTimeout(timeout);
            }
        }
    }, [cep]);

    const submitOrder = async () => {
        if (!selectedDeliveryOption) {
            toast.error("Por favor, selecione uma opção de entrega.");
            return;
        }
    };

    const total = finalPrice + deliveryTax * 100;

    const submitOrders = async () => {
        const products = cartProducts.map((product) => {
            return {
                id: product.id,
                quantity: product.quantity,
                price: product.price
            };
        });
        try {
            const { data } = await api.post('/create-payment-intent', { products });
            navigate('/checkout', {
                state: data,
            });

        } catch (err) {
            toast.error('❌ Erro ao processar o pagamento. Tente novamente!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className='title'>Resumo do Pedido</h2>
                    <p className='items'>Itens</p>
                    <p className='items-price'>{formatPrice(finalPrice)}</p>
                    <p className='delivery-tax'>Taxa de Entrega</p>
                    <p className='delivery-tax-price'>
                        {typeof deliveryTax === 'number' ? formatPrice(deliveryTax * 100) : '0,00'}
                    </p>

                </div>

                <div className="container-cep">
                    <label>Digite seu CEP</label>
                    <input
                        type="text"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />
                </div>

                {deliveryOptions.length > 0 && (
                    <div className="delivery-options">
                        <h3>Selecione a opção de entrega</h3>
                        {deliveryOptions.map(option => (
                            <div key={option.id}>
                                <input
                                    type="radio"
                                    id={option.id}
                                    name="deliveryOption"
                                    value={option.id}
                                    onChange={() => {
                                        setSelectedDeliveryOption(option);
                                        setDeliveryTax(option.price);
                                    }}
                                />
                                <label htmlFor={option.id}>
                                    {option.name} - {formatPrice(option.price * 100)}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                <div className="ButtonCart">
                    <p>Total</p>
                    <p>{formatPrice(total)}</p>
                </div>
            </Container>

            <ButtonCart onClick={submitOrders}>Finalizar Pedido</ButtonCart>
        </div>
    );
}