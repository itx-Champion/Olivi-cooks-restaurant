import React, { useContext } from 'react';
import logo from '../Image/olivia cooks.png';
import cartLogo from '../Image/ICON/shopping-cart.png';
import { Link } from 'react-router-dom';
import { CartContext, UserContext } from '../App';

const Navbar = () => {
    const [cart, setCart] = useContext(CartContext);
    const [loggedInUser, setloggedInUser] = useContext(UserContext);

    return (
        <div className="d-flex justify-content-between px-5 py-3">
            <Link to="/home"> <img style={{ height: '85px',width:'140px' }} src={logo} alt="" /> </Link>
            <div>
                <Link to="/checkout"> <button className="btn btn-light">
                    <img style={{ height: '50px', }} className="mx-2" src={cartLogo} alt="" />
                    <small>Checkout - {cart.length}</small>
                </button> </Link>
                {!loggedInUser.name && <Link to="/Login"> <button className="btn btn-danger mx-2" style={{height:
                "40px",width:'100px',fontWeight:'bold'}}>Log in</button></Link>}
                {!loggedInUser.name && <Link to="/SignUp"><button className="btn btn-dark mx-2" style={{height:
                "40px",width:'100px',fontWeight:'bold'}}>Sign Up</button></Link>}
                {loggedInUser.name && <button onClick={()=> setloggedInUser('')} className="btn btn-danger mx-2">Log Out</button>}
            </div>
        </div>
    );
};

export default Navbar;