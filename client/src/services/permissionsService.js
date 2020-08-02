import { baseUrl } from '../config';

export const fetchPermissions = () => {
    return fetch(baseUrl + 'permissions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error('Error ' + response.status + ': ' + response.statusText);
          throw error;
        }
      })
    .then(response => response.json())
    .catch((error) => {
        console.error(error.message);
        return [];
    });
};