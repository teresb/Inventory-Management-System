import React, { createContext, /*useEffect,*/ useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import CustomerPage from './components/CustomerPage';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

function App() {
    const [cart, setCart] = useState([]);  // Initialize the cart as an empty array
    //useEffect(() => {
     //   console.log('Cart state in App.js', cart);
    //}, [cart]);
    return (
        <CartContext.Provider value={{cart, setCart}}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin-dashboard" element={<Admin />} />
                    <Route path="/user-dashboard" element={<CustomerPage cart={cart} setCart={setCart} />} />
                </Routes>
            </Router>
        </CartContext.Provider>
    );
}

export default App;
