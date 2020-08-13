const fetchProducts = async () => {
  const data = await fetch('/users/productList/fetch');
  const json = await data.json();
  return json;
}

export default fetchProducts;