import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Available</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Categories</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map(product=>(
            <tr key={product.name}>
              <td>{ product.productId }</td>
              <td>{ product.name }</td>
              <td>{ product.availability?"YES":"NO" }</td>
              <td>{ product.quantity }</td>
              <td>{ product.price }</td>
              <td>{ product.category.reduce((acc,catg)=>acc+catg+' ',"") }</td>
              <td> 
                <Link to={`/${product.productId}`} >Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default ProductList;