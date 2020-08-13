import React from 'react';

const SortByPrice = ({ onSortChange }) => {
  return (
    <>
      Sort by Price: &nbsp;
      <select onChange={onSortChange}>
        <option value='default'>Sort by Price</option>
        <option value='lowToHigh'>Low to High</option>
        <option value='highToLow'>High to Low</option>
      </select>
    </>
  )
}

export default SortByPrice;