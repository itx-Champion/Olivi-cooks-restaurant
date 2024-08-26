import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext ,UserContext} from '../App';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../storageManager';
import Cart from './Cart';
import menuData from './menuData';
import rider from '../Image/Rider.gif';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


const Checkout = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const [address, setAddress] = useState({});
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        setAddress(data);
    }

    const [gif, setGif] = useState(false);
    const [cart, setCart] = useContext(CartContext);
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

    const removeItem = (e) => {
        const newCart = cart.filter(p => p.id !== e);
        setCart(newCart);
        removeFromDatabaseCart(e);
    }
    const placeOrder = () => {
        processOrder();
        setCart([]);
        setGif(true);
    }
    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const VAT = total / 10;
    let tip;
    total < 100 ? tip = total * .05 : tip = 0;
    const GrandTotal = total + VAT + tip;
    return (
        <div className="container mt-5">
            <div className="row">
                {gif && <div className="col-md-6 px-5">
                    <img id="rider" className="w-100" src={rider} alt="" />
                </div>}
                {!gif && <div className="col-md-6 px-5">
                    <h3>Delivery details</h3> <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control" name="area" placeholder="Your location area" ref={register({ required: true })} />
                        {errors.area && <small className="text-danger">This field is required</small>} <br />
                        <input type="text" className="form-control" name="street" placeholder="Flat/Street no" ref={register({ required: true })} />
                        {errors.street && <small className="text-danger">This field is required</small>} <br />
                        <input type="text" className="form-control" name="mobile" placeholder="Phone number" ref={register({ required: true })} />
                        {errors.mobile && <small className="text-danger">This field is required</small>}<br />
                        <textarea className="form-control" rows="3" name="instruction" placeholder="(Optional)Special instructions..." ref={register({ required: false })}></textarea>
                        {errors.instruction && <small className="text-danger">This field is required</small>}<br />
                        <input className="btn btn-danger w-100" type="submit" value="Save & continue" />
                    </form>
                </div>}
                {!gif && <div className="col-md-6 px-5">
                    <h3>Order details</h3> <hr />
                    {
                        cart.map(x => <Cart removeItem={removeItem} item={x}></Cart>)
                    }
                    <p>Sub total : ${total}</p>
                    <p>VAT (10%) : ${VAT}</p>
                    <p>Delivery charge ({total < 100 ? "5%" : "Free for $100+"}) : ${tip}</p>
                    <h5>Grand total : ${GrandTotal}</h5>
                    {total !== 0 ? <button type="submit" onClick={placeOrder} className="btn btn-danger w-100">Place order</button> :
                        <button disabled onClick={placeOrder} className="btn btn-danger w-100">Place order</button>}
                </div>}
                {gif && <div className="col-md-6 px-5">
                    <h3>Delivery address</h3> <hr />
                    <address>
                <h6>Customer : {loggedInUser.name}</h6>
                        <p>Location : {address.area}</p>
                        <p>Flat/Street no : {address.street}</p>
                        <p>Contact :  {address.mobile}</p>
                        <p>Special Instructions : {address.instruction}</p>
                    </address>
                </div>}
                {/* <Link to="/home" className="btn btn-danger text-white">Order More?</Link> */}
            </div>
        </div>
    );
};

export default Checkout;