import React, { useState, useEffect } from 'react';
import { useCart } from '../App';
import Modal from './Modal';

function CustomerPage() {
    const { cart, setCart } = useCart();  // Access cart and setCart from context
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const addToCart = (product, quantity) => {
        const existingProduct = cart.find(item => item.product._id === product._id);
        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.product._id === product._id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
        } else {
            updatedCart = [...cart, { product, quantity }];
        }
        setCart(updatedCart);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.map(product => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                        />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Available: {product.quantity} units</p>
                        <button onClick={() => {
                            const quantity = parseInt(prompt('Enter quantity:', '1'));
                            if (quantity > 0 && quantity <= product.quantity) {
                                addToCart(product, quantity);
                            } else {
                                alert('Invalid quantity selected');
                            }
                        }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsCartOpen(true)} style={{ marginTop: '20px' }}>
                View Cart
            </button>

            <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map(item => (
                            <div key={item.product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                                <h3>{item.product.name}</h3>
                                <p>Price: ${item.product.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: ${item.product.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default CustomerPage;
