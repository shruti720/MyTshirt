import React from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base'



const AdminDashBoard = ()=>{

    const {
        user:{name, email, role}
    } = isAutheticated();
const adminLeftSide =() =>{
    return(
        <div className='card'>
            <h3 className='card-header bg-dark text-white'>Admin Navigation</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className='nav-link text-success' to="/admin/create/category">Create categories</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link text-success' to="/admin/categories">Manage categories</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link text-success' to="/admin/create/product">Create Product</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link text-success' to="/admin/products">Manage Product</Link>
                </li>
                <li className='list-group-item'>
                    <Link className='nav-link text-success' to="/admin/oders">Manage orders</Link>
                </li>
            </ul>
        </div>
    )
}

const adminRightSide =() =>{
    return(
        <div className='card mb-4'  >
            <h4 className='card-header'>Admin information</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <span className='badge badge-success mr-2'>Name:    </span> {name}
                </li>
                <li className='list-group-item'>
                    <span className='badge badge-success mr-2'>Email:    </span> {email}
                </li>
                <li className='list-group-item'>
                    <span className='badge badge-danger'>Admin area</span>
                </li>
            </ul>
        </div>
    )
}
    return(
        <Base title='Welcome to Admin area'
            description='Manage all of your product here'
            className='container bg-success p-4'
        >


        <div className='row'>
            <div className='col-md-4'>
                {adminLeftSide()}
            </div>
            <div className='col-8'>
                {adminRightSide()}
            </div>
        </div>
        </Base>
    )
}

export default AdminDashBoard;