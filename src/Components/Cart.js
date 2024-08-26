import React from 'react';

const Cart = ({ item, removeItem }) => {
    return (
            <div style={{ borderRadius: "10px" }} className="d-flex  bg-light justify-content-around  py-2 my-1">
                <img style={{ height: "100px", width: "100px" }} src={require(`../Image/Menu/${item.pic}`)} alt="" />
                <div>
                    <h5>{item.item}</h5>
                    <span className="text-danger">${item.price}</span> <br />
                    <small>Quantity:{item.quantity}</small>
                </div>
                <div>
                    <button onClick={() => removeItem(item.id)} className="btn btn-danger rounded-circle">X</button>
                </div>
            </div>
    );
};

export default Cart;