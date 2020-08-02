import { baseUrl } from '../config';
import { addProducts } from '../state/products/productsActions';

export const fetchProducts = () => (dispatch) => {
    return fetch(baseUrl + 'products')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error('Error ' + response.status + ': ' + response.statusText);
          throw error;
        }
      })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch((error) => {
        console.error(error.message);
        dispatch(addProducts([]));
    });
};