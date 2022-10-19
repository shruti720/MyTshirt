import { API } from "../../backend";

export const createCategory = (userId, token, category) =>{
    return fetch(`http://localhost:8000/api/category/create/${userId}`, {
        method:"POST",
        headers:{
            accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(category)
    }).then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err))
};


export const updateCategory= (userId,categoryId, token, updatedcategory) =>{
    return fetch(`http://localhost:8000/api/category/${categoryId}/${userId}`,
    {
        method:"PUT",
        headers:{
            accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(updatedcategory)
    }).then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err))
};
//  getAllCategories
export const getcategories =()=>{
    return fetch(`http://localhost:8000/api/categories`,{
        method:"GET",
    }).then(res=>{
       return res.json();
    }).catch(err=> console.log(err))
}

//products call

export const createProduct =(userId,token, product) => {
    return fetch(`http://localhost:8000/api/product/create/${userId}`,{
        method:"POST",
        headers:{
            accept:"application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body:product
    }).then(response =>{
        return response.json()
    }).catch(err=>{
        console.log(err)
    })
}

//Get all product

export const getProducts =()=>{
    return fetch(`http://localhost:8000/api/products`,{
        method:"GET",
    }).then(res=>{
        return res.json();
    }).catch(err=> console.log(err))
}

export const deleteCategory =(categoryId, userId,token)=>{
    return fetch(`http://localhost:8000/api/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            accept:"application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response =>{
        return response.json()
    }).catch(err=>{
        console.log(err)
    })
}

//Delete a product

export const deleteProduct =(productId, userId,token,) => {
    return fetch(`http://localhost:8000/api/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            accept:"application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
      
    }).then(response =>{
        return response.json()
    }).catch(err=>{
        console.log(err)
    })
}

//Get a Product

export const getProduct =(productId)=>{
    return fetch(`http://localhost:8000/api/product/${productId}`,{
        method:"GET",
    }).then(res=>{
        return res.json();
    }).catch(err=> console.log(err))
}

//update a Product 

export const updateProduct =(productId, userId,token, product) => {
    return fetch(`http://localhost:8000/api/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            accept:"application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body:product
    }).then(response =>{
        return response.json()
    }).catch(err=>{
        console.log(err)
    })
}