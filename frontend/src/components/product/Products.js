import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../store/actions/actionCreators'
import ProductList from './ProductList';
import SortByPrice from './SortByPrice';
import SearchByName from './SearchByName';
import Filter from './Filter';

class Products extends React.Component{

  constructor(props){
    super(props);
    this.state={
      products:props.products,
    }
    this.filterByName = this.filterByName.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  onSortChange(e){
    const sortOrder = e.target.value;
    let sortedProducts = this.state.products.sort((a,b)=>a.price-b.price);
    if(sortOrder === 'highToLow')
      sortedProducts = sortedProducts.reverse();
    if(sortOrder === 'default')
    return;
    this.setState({
      products:sortedProducts
    });
  }

  applyFilters(options){
    const keys = Object.keys(options).filter(option=>options[option]);
    let filteredProducts = this.props.products;
    if(keys.includes('available')){
      filteredProducts = filteredProducts.filter(product=>product.availability)
    }
    if(keys.includes('unavailable')){
      filteredProducts = filteredProducts.filter(product=>!product.availability)
    }
    keys.forEach(key=>{
      switch(key){
        case 'available':
          break;
        case 'unavailable':
          break;
        default:
          filteredProducts = filteredProducts.filter(product=>product.category.includes(key))
      }
    })
    this.setState({
      products:filteredProducts
    })
  }

  componentDidMount(){
    this.props.fetchProducts();
  }

  componentDidUpdate(prevProps){
    if(this.props.products.length !== prevProps.products.length){
      this.setState({
        products: this.props.products
      })
    }
  }

  filterByName(name){
    let products = this.props.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    this.setState({
      products
    })
  }

  render(){
    const { products } = this.state;
    return (
      <>
        <SortByPrice onSortChange={(e)=>this.onSortChange(e)} />
        <SearchByName filterByName = {this.filterByName} />
        <Filter applyFilters={this.applyFilters} />
        <ProductList products = {products} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  } 
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);