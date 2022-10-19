import React,{useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { updateProduct, getcategories, getProduct } from './helper/adminapicall';

const UpdateProduct =({match}) => {

 const {user, token} = isAutheticated();

const [values, setValues] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:[],
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    getaRederect:false,
    formData:""
});


const  preloadCategories = () =>{
    getcategories().then(data=>{
        if (data && data.error){
            setValues({...values, error: data.error})
        } else {
            setValues({categories:data , formData: new FormData() })
        }
    })
}

const performRedirect = () => { 
  if (getaRederect) {   
      return <Redirect to="/admin/dashboard"/>
  }
};
const {name,description,price,stock,photo,categories,category,loading,error,createdProduct,getaRederect,formData} = values;

    const preload = (productId) =>{
        getProduct(productId).then(data=>{
            console.log(data)
            if (data && data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category,
                    stock:data.stock,
                    formData: new FormData()
                    
                })
                preloadCategories();
            }
        })
    };


    useEffect(() => {
     preload(match.params.productId);
    }, []);
    
    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:"",loading:true})
        updateProduct(match.params.productId,user._id,token,formData).then(data=>{
          if(data&&data.error){
            setValues({...values,error:data.error})
          } else {
            setValues({...values, name:"",description:"",price:"",stock:"",photo:"",loading:false,createdProduct:data.name})
            setTimeout(() => {
              setValues({...values,getaRederect:true})
           }, 2000);
          }
        })
    }

   
    

    const handleChange = name => event =>{
        const value = name === "photo" ? event.target.files[0] : event.target.value ;
        formData.set(name , value);
        setValues({...values, [name]: value})
    };

    const successMassage = () =>
     ( <div className='alert alert-success mt-3'
        style={{display: createdProduct ? "" : "none"}}>
        <h4>
          {createdProduct } created Successfully
        </h4>
      </div>)
    

     const errorMassage =() =>(
       <div className='alert alert-danger mt-3'
       style={{display: error ? "" :"none"}}>
         <h4>Failed to create a product</h4>
         <p>{error}</p>
       </div>
     )
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories&& categories.map((cate,index)=>(
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Product
          </button>
        </form>
      );

  return (
      <Base title='Create Product' description='Create a product here!' className='container bg-info p-4'>
        <Link to="/admin/dashboard" className='btn btn-md btn-dark mb-3'>AdminDashBoard</Link>
        <div className='row bg-dark text-white rounded'>
            <div className='col-md-8 offset-md-2'>
              {successMassage()}
              {errorMassage()} 
           { createProductForm()}
           {performRedirect()}
            </div>
        </div>
      </Base>
  )
}

export default UpdateProduct;