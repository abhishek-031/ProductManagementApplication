import { takeEvery, call, put, all } from 'redux-saga/effects';
import { FETCH_PRODUCTS, DELETE_PRODUCT } from '../store/actions/actionTypes';
import fetchProducts from '../api/fetchProducts';
import deleteProductAsync from '../api/deleteProduct';
import { setProducts, deleteProduct } from '../store/actions/actionCreators';

function* productWorker(){
  const products = yield call(fetchProducts);
  yield put(setProducts(products));
}

function* productWatcher(){
  yield takeEvery(FETCH_PRODUCTS,productWorker);
}

function* productDeleteWorker(action){
  yield call(deleteProductAsync,action.productId);
  yield put(deleteProduct(action.productId));
}

function* productDeleteWatcher(){
  yield takeEvery(DELETE_PRODUCT,productDeleteWorker);
}

function* rootSaga(){
  yield all([productDeleteWatcher(),productWatcher()])
}

export default rootSaga;