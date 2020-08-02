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

export const addProduct = (product) => {
  return fetch(baseUrl + 'products', {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  }).then(response => {
      if (response.ok) {
        return true;
      } else {
        const error = new Error('Error ' + response.status + ': ' + response.statusText);
          throw error;
      }
    })
  .catch((error) => {
      console.error(error.message);
      return false;
  });
};

export const editProduct = (product) => {
  return fetch(baseUrl + 'products/' + product.id, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  }).then(response => {
      if (response.ok) {
        return true;
      } else {
        const error = new Error('Error ' + response.status + ': ' + response.statusText);
          throw error;
      }
    })
  .catch((error) => {
      console.error(error.message);
      return false;
  });
};