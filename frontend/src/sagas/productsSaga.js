import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_PRODUCTS } from '../store/actions/actionTypes';
import fetchProducts from '../api/fetchProducts';
import { setProducts } from '../store/actions/actionCreators';

function* productWorker(){
  const products = yield call(fetchProducts);
  yield put(setProducts(products));
}

function* productWatcher(){
  yield takeEvery(FETCH_PRODUCTS,productWorker);
}

export default productWatcher;