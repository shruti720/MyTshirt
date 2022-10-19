import React, { useState } from 'react';
import Imagehelper from './helper/imagehelper';
import { Redirect } from "react-router-dom"; 
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

    const Card = ({product=undefined, addtoCart= true, removeFromCart= false, setReload=f=>f, reload=undefined}) => {

      const [redirect, setRedirect] = useState(false);
      const [count, setCount] = useState(product.count);

      const cartTitle= product? product.name : "A photo from pexels";
      const cartDescription= product? product.description : " this photo looks great";
      const cartPrice = product? product.price : "DEFAULT" ;


      const addToCartf = () =>{
        addItemToCart(product, ()=>{
          setRedirect(true)
        });
      }
      const getARedirect = (redirect)=>{
        if(redirect){
          return <Redirect to="/cart" />
        }
      }
        const showAddtoCart = () =>{
           return (addtoCart &&(
                <button
                    onClick={addToCartf }
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
            ))
        }

        const showRemovefromCart = ()=>{
            return (removeFromCart && (
                <button
                    onClick={() => {removeItemFromCart(product._id)
                    setReload(!reload)
                    }
                  
                  }
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
            ))
        }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header text-center lead">{cartTitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
            <Imagehelper product={product} />
              <p className="lead bg-success text-center font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded text-center btn-sm px-4">$ {cartPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddtoCart()}
                </div>
                <div className="col-12">
                  {showRemovefromCart()}
                </div>
              </div>
            </div>
          </div>
        );
      };


export default Card;
