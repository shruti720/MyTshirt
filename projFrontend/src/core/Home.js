import React,{useState,useEffect} from "react";

import "../styles.css";

import Base from "./Base";
import Card from "./card";
import { getProducts } from "./helper/coreapicalls";


export default function Home() {
 
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
       <h3>All of the Tshirts</h3>
      <div className="row">
       
        {/* <div className="col-4 text-center ">
          <Card />
        </div>
        <div className="col-4 text-center">
          <Card/>
        </div>
        <div className="col-4 text-center">
          <Card/>
        </div> */}

        {products.map((product,index)=>{
          return(
            <div key={index} className="col-4 mb-4" text-center>
              <Card product={product} />
            </div>
            )
        })}
      </div>
    </Base>
  );
}
