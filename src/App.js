import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar';
import Selecteditem from './Components/Selecteditem';
import Checkout from './Components/Checkout';
import { createContext } from 'react';
import { useState } from 'react';
import Login from './Components/Login';
import { getDatabaseCart } from './storageManager';
import menuData from './Components/menuData';
import SignUp from './Components/SignUp';
import PrivateRoute from './Components/PrivateRoute';
export const CartContext = createContext();
export const UserContext = createContext();
function App() {
  const [loggedInUser, setloggedInUser] = useState({ name: '', email: '', password: '', error: '', success: false });
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const savedKeys = Object.keys(savedCart);
    const AddedCart = savedKeys.map(itemId => {
      const CartItems = menuData.find(x => x.id === itemId);
      CartItems.quantity = savedCart[itemId];
      return CartItems;
    })
    setCart(AddedCart);
  }, []);
  return (
    <UserContext.Provider value={[loggedInUser, setloggedInUser]}>
      <CartContext.Provider value={[cart, setCart]}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/SignUp">
              <SignUp/>
            </Route>
            <PrivateRoute path="/checkout">
              <Checkout />
            </PrivateRoute>
            <PrivateRoute path="/Selecteditem/:id">
              <Selecteditem />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;