import React, { useState, useEffect } from 'react';

function Admin() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);

    // Fetch products from the backend
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = { name, price, quantity };
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        setProducts([...products, newProduct]);
        setName('');
        setPrice('');
        setQuantity('');
    };

    const handleEditProduct = (product) => {
        setEditingProductId(product._id);
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const updatedProduct = { name, price, quantity };
        await fetch(`http://localhost:5000/products/${editingProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        setProducts(products.map(product => product._id === editingProductId ? updatedProduct : product));
        setName('');
        setPrice('');
        setQuantity('');
        setEditingProductId(null);
    };

    const handleDeleteProduct = async (id) => {
        await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        });
        setProducts(products.filter(product => product._id !== id));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Admin Dashboard</h2>
            <form onSubmit={editingProductId ? handleUpdateProduct : handleAddProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit" style={{ marginTop: '10px' }}>
                    {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            <h3>Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price} - {product.quantity} units
                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
