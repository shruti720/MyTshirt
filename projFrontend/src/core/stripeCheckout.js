import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from "react-stripe-checkout"
import { createOrder } from './helper/orderhelper';


const Stripecheckout = ({products,
    setReload = f =>f,
    reload=undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAutheticated()&& isAutheticated().token
    const userId = isAutheticated()&& isAutheticated().user._id

    const getfinalPrice = () =>{
        let amount=0;
        products.map(p=>{
            amount+=p.price;
        })
        return amount
    } 
const showStripeButton = () =>{
    return isAutheticated() ? (
        <StripeCheckoutButton
        stripeKey='pk_test_51Kkg90SBDd311qp22caKX3Y5c6YXtVpD7Fum7XpTotRArqkbFINFz7UDjLnso8cVExvqTL9krPxkYfQdW1QUNqfT00gTqeXygi'
        token={makePayment}
        amount={getfinalPrice() * 100}
        name="Buy T shirts"
        shippingAddress
        billingAddress
        >
            <button className="btn btn-success rounded"> Pay with Stripe</button>
        </StripeCheckoutButton>
        
    ) : (
        <Link to="/signin">
            <button className="btn btn-warning rounded">Signin</button>
        </Link>
    )
};

const makePayment = (token) =>{
    const body={
        token,
        products,

    }
    const headers ={
        "Content-Type":"application/json"
    }
    return fetch(`http://localhost:8000/api/stripepayment`,{
        method:"POST",
        headers,
        body:JSON.stringify(body)
    }).then(res=>{
        console.log(res);
        //call further methode
    }).catch(err=>{
        console.log(err);
    })
}
    return (
        <div>
            <h3 className='text-white'>Stripe checkout of {getfinalPrice()} </h3>
            {showStripeButton()}
        </div>
    );
}

export default Stripecheckout;
