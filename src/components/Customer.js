import React, { useState, useEffect } from 'react';

function Customer({ cart, setCart}) {
    const [products, setProducts] = useState([]);
   /* const [quantity, setQuantity] = useState([1]);*/

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const addToCart = (product) => {
        console.log('Adding to cart:', product)
        const existingProduct = cart.find(item => item.product._id === product._id);
        if (existingProduct) {
            setCart(cart.map(item => item.product._id === product._id
                ?{ ...item, quantity: item.quantity + quantity}: item
            ))
        }else{
        setCart([...cart, { product, quantity }]);
    }
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
                        <input
                            type="number"
                            min="1"
                            max={product.quantity}
                            defaultValue="1"
                        />
                        <button onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => window.location.href='/cart'} style={{ marginTop: '20px' }}>
                View Cart
            </button>
        </div>
    );
}

export default Customer;
