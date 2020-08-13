const deleteProductAsync = async (productId) => {
  await fetch(`/users/productList/deleteProduct/${productId}`,{
    method:'DELETE'
  })
}

export default deleteProductAsync;