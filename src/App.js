import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Customer from './components/Customer';
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/admin-dashboard" element={<Admin />}/>
                <Route path="/user-dashboard" element={<Customer cart={cart} setCart={setCart}/>}/>
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
