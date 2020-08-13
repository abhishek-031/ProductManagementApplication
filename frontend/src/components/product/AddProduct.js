import React from 'react';

class AddProduct extends React.Component{

  constructor(props){
    super(props);
    this.state={
      adding:false
    }
  }

  async handleSubmit(e){
    e.preventDefault();
    this.setState({adding:true});
    const product = {};
    const form = document.forms['newProduct'];
    product.name = form.name.value;
    const categories = [];
    this.categories.forEach(category=>{
      if(form[category].checked){
        categories.push(category);
      }
    });
    product.category = categories;
    product.availability = form.availability.value==='available'?true:false;
    product.price = parseFloat(form.price.value);
    product.quantity = parseInt(form.quantity.value);
    await fetch('/users/productList/createProduct',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(product)
    });
    this.setState({
      adding:false,
    });
    this.props.history.push('/products');
  }

  categories = [
    'Transport',
    'Electronics',
    'Furniture',
    'Entertainment',
    'Fitness',
    'Sports'
  ];

  render(){
    return (
      <form name='newProduct' onSubmit={e=>this.handleSubmit(e)}>
        <label htmlFor='name'>Name</label>
        <input required type='text' name='name' id='name'/>
        <br />

        <label>Categories</label>
        <br />
        { this.categories.map(category => (
          <label key={category}><input type='checkbox' name={category} id={category} value={category}/>{category}</label>
        ))}

        <br/>

        <label htmlFor='availability'>Availability</label> <br/>
        <input type='radio' name='availability' value='available' defaultChecked /> Available <br/>
        <input type='radio' name='availability' value='unavailable' /> Unavailable <br/>

        <label>Price</label>
        <input required type='number' step='any' min={0} name='price'/> <br/>

        <label>Quantity</label>
        <input required type='number' min={0} name='quantity'/> <br/>
        {
          this.state.adding?
          <button type='submit' disabled>Add Product</button>:
          <button type='submit'>Add Product</button>
        }
      </form>
    )
  }
}

export default AddProduct;