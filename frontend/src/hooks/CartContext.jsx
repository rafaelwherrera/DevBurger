import React from 'react';
import {
    useContext,
    createContext,
    useEffect,
    useState,
} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);
        let newProductInCart = [];
        if (cartIndex >= 0) {
            newProductInCart = [...cartProducts];
            newProductInCart[cartIndex].quantity += 1;
            setCartProducts(newProductInCart);
        } else {
            product.quantity = 1;
            newProductInCart = [...cartProducts, product];
            setCartProducts(newProductInCart);
        }
        updateLocalStorage(newProductInCart);
    };

    const clearCart = () => {
        setCartProducts([]);
        updateLocalStorage([]);
    };

    const deleteProduct = (productId) => {
        const newCart = cartProducts.filter((prd) => prd.id !== productId);
        setCartProducts(newCart);
        updateLocalStorage(newCart);
    };

    const increaseProduct = (productId) => {
        const newCart = cartProducts.map((prd) =>
            prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd
        );
        setCartProducts(newCart);
        updateLocalStorage(newCart);
    };

    const decreaseProduct = (productId) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);
        if (cartProducts[cartIndex].quantity > 1) {
            const newCart = cartProducts.map((prd) =>
                prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd
            );
            setCartProducts(newCart);
            updateLocalStorage(newCart);
        } else {
            deleteProduct(productId);
        }
    };

    const updateLocalStorage = (products) => {
        localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
    };

    useEffect(() => {
        const clientCartData = localStorage.getItem('devburger:cartInfo');
        if (clientCartData) {
            setCartProducts(JSON.parse(clientCartData));
        }
    }, []); 
    

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                putProductInCart,
                clearCart,
                decreaseProduct,
                increaseProduct,
                deleteProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
