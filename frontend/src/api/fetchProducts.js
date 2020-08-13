const fetchProducts = async () => {
  const data = await fetch('/users/admin/productList/fetch');
  const json = await data.json();
  return json;
}

export default fetchProducts;