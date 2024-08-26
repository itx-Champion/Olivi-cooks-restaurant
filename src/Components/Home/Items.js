import React from 'react';
import { Link } from 'react-router-dom';

const Items = ({ x, item, pic, price, handleItem, id }) => {
    return (

        <div id="items" className="col-md-4 text-center  py-4">
            <Link onClick={() => handleItem(x)} to={`/Selecteditem/${id}`}>
                <img className="w-50" src={require(`../../Image/Menu/${pic}`)} alt="" />
                <h5 className="text-dark ">{item}</h5>
                <h4 className="text-danger ">${price}</h4>
            </Link>
        </div>

    );
};

export default Items;