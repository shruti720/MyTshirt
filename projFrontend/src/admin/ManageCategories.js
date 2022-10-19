import React,{ useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { deleteCategory, getcategories } from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';


const ManageCategories=() => {
  const {user,token} = isAutheticated();
  const [categories, setCategories] = useState([]);

  const preload = () =>{
    getcategories().then(data=>{
      if(data&&data.error) 
        console.error(data.error)
      else{
        console.log(data);
        setCategories(data);
        console.log(categories);
      }
    })
  }

  useEffect(() => {
    preload();
    
  }, []);
  

  const deletecategory =categoryId=>{
    console.log("deleting bieng executed");
     deleteCategory(categoryId,user._id,token).then(data => {
       if (data&&data.error) {
         console.log(data.error);
       } else {
         preload();
       }
     });
  }

  return (
      <Base title='ManageCategories' description='Welcome to to manage categories'>
        <h2 className='mb-4 text-center'>All Categories</h2>
        <Link className='btn btn-info' to={`/admin/dashboard`}><span>Admin Dashboard</span></Link>

        <div className='row'>
          <div className='col-md-8 offset-2'>
            <h2 className='text-center my-3'>Total {categories.length} Categories</h2>
             { categories.map((category,index)=>{
               return(
                <div className='row text-center mb-2'>
                <div className='col-md-6'>
                  <h2 className='text-left text-white '>{category.name}</h2>
                </div>
                <div className='col-3'>
                  <Link to={`/admin/category/update/${category._id}`} className='btn btn-success rounded' > <span>Update</span></Link>
                </div>

                <div className='col-3'>
                  <button className='btn text-danger' onClick={()=>{deletecategory(category._id);}}>Delete</button>
                </div> 
              </div>
               )

              })} 


                
          </div>
        </div>
      </Base>
  )
}

export default ManageCategories