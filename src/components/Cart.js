import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        if (cart.length === 0){
            alert("Your cart is empty");
            return;
        }
        const receipt = {
            date: new Date().toLocaleString(),
            items: cart,
            totalPrice: getTotalPrice(),
        };
        console.log('Receipt:', receipt);  // This is where the receipt would be generated
        alert('Checkout successful! A receipt has been generated.');
        setCart([]);  // Clear the cart after checkout
        navigate('/');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h3>{item.product.name}</h3>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${item.product.price * item.quantity}</p>
                        </div>
                    ))}
                    <h3>Total Price: ${getTotalPrice()}</h3>
                    <button onClick={handleCheckout} style={{ marginTop: '20px' }}>
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
