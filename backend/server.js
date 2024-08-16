const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory_management')
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    imageurl: String,
});

const Product = mongoose.model('Product', productSchema);

// Add a new product
app.post('/products', async (req, res) => {
    const { name, price, quantity } = req.body;
    const product = new Product({ name, price, quantity });
    await product.save();
    res.send({ message: 'Product added successfully!' });
});

// Get all products
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// Edit a product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    await Product.findByIdAndUpdate(id, { name, price, quantity });
    res.send({ message: 'Product updated successfully!' });
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.send({ message: 'Product deleted successfully!' });
});

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    username: { 
        type: String, unique: true, required: true 
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if(existingUser){
        return res.status(400).send({message: 'Username already exists'});
    }
    const user = new User({ email, username, password });
    await user.save();
    res.send({ message: 'User registered successfully!' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        if (user.isAdmin) {
            res.send({ message: 'Admin login successful!', isAdmin: true });
        } else {
            res.send({ message: 'Login successful!', isAdmin: false });
        }
    } else {
        res.send({ message: 'Invalid email or password' });
    }
});


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
