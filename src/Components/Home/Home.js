import React from 'react';
import { useState } from 'react';
import menuData from '../menuData';
import Items from './Items';
import logo from '../../Image/olivia cooks 2.png';
import gif2 from '../../Image/gifs/banner4.gif';
import card2 from '../../Image/gifs/Chef2.gif';
import card3 from '../../Image/gifs/kitchen.gif';
import chkn from '../../Image/gifs/food.gif';
import './home.css';

const Home = () => {
    const [menu, setMenu] = useState(menuData.slice(0, 6));
    // console.log(menu);
    const handleAll = () => {
        setMenu(menuData);
        console.log("done");
    }
    const handleBreakfast = () => {
        const breakfast = menuData.filter(y => y.category === "breakfast");
        // console.log(breakfast);
        setMenu(breakfast);
    }
    const handleLunch = () => {
        const lunch = menuData.filter(y => y.category === "lunch");
        // console.log(lunch);
        setMenu(lunch);
    }
    const handleDinner = () => {
        const dinner = menuData.filter(y => y.category === "dinner");
        // console.log(dinner);
        setMenu(dinner);
    }
    const handleItem = (e) => {
        // console.log(e);
    }

    return (
        <div>
            {/* Banner */}
            <div className="banner text-center pt-5">
                <h1>We serve the 'BEST' and 'HEALTHY' food for your stomach!</h1>
                <h2>Best FOOD is always waiting for you...</h2><br/>
                <img  style={{ height: "300px", width: "500px", borderRadius: "20px" }} src={gif2} alt="" />
                { /*<img style={{height:"250px",width:"350px"}} src={gif2} alt="" /> */}
            </div>
            {/* Menu Items */}
            <div className="d-flex justify-content-center">
                <button onClick={handleAll} className="btn mixbtn btn-danger mx-3 my-5">All</button>
                <button onClick={handleBreakfast} className="btn mixbtn btn-danger mx-3 my-5">Breakfast</button>
                <button onClick={handleLunch} className="btn mixbtn btn-danger mx-3 my-5">Lunch</button>
                <button onClick={handleDinner} className="btn mixbtn btn-danger mx-3 my-5">Dinner</button>
            </div>
            <div className="container"> <hr/>
                <div className="row">
                    {
                        menu.map(x =>
                            <Items
                                x={x} key={x.id} id={x.id} handleItem={handleItem} item={x.item} pic={x.pic} price={x.price} />)
                    }
                </div> <hr />
            </div>
            <div className="container text-center">
                <h1 className="m-5">Why Choose Us</h1>
                <div className="row">
                    <div className="col-md-4 ">
                        <img style={{ borderRadius: "10px",height:'240px' }} className="w-100" src={chkn} alt="" />
                        <h4 >Healthy food's</h4>
                        <p>Discover delicious and wholesome food that's good for you. Enjoy tasty meals packed with nutrients to keep you feeling your best!.</p>
                    </div>
                    <div className="col-md-4">
                        <img style={{ borderRadius: "10px",height:'240px' }} className="w-100" src={card3} alt="" />
                        <h4>Live kitchen</h4>
                        <p>A bustling haven where delicious creations come to life. The heart of flavors and culinary magic..</p>
                    </div>
                    <div className="col-md-4">
                        <img style={{ borderRadius: "10px",height:'240px' }} className="w-100" src={card2} alt="" />
                        <h4 >Expert chef's</h4>
                        <p>A true culinary master, expertly crafting flavors into delightful creations.
                        Mastery in the kitchen, turning ingredients into culinary wonders.</p>
                    </div>
                </div>
            </div>
            <footer className="container-fluid mt-5  text-white">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-md-6">
                            <img style={{ height: '200px',width:'250px'}} src={logo} alt="" />
                        </div>
                        <div className="col-md-3 hovc" style={{paddingTop:'20px'}}>
                            <p><a href=''>About Olivia Cooks</a></p>
                            <p><a href=''>Read our blog</a></p>
                            <p><a href=''>Refund policy</a></p>
                            <p><a href=''>Terms & Conditions</a></p>
                        </div>
                        <div className="col-md-3 hovc" style={{paddingTop:'20px'}}>
                            <p><a href=''>FAQ</a></p>
                            <p><a href=''>Help</a></p>
                            <p><a href=''>Support</a></p>
                            <p><a href=''> Pricing</a></p>
                        </div>
                    </div>
                    <p className="text-light" style={{textAlign:'center',paddingBottom:'10px'}}> &copy; All rights reserved by Hasanul_Banna</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;