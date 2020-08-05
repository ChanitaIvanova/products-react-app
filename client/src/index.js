import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/common.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import NavComponent from './components/navigation/NavComponent';
import { Provider } from 'react-redux';
import store from './state/store';
import { fetchPermissions } from './services/permissionsService';
import { receivePermissions } from './state/permissions/permissionsActions';

fetchPermissions().then((permissions) => {
    store.dispatch(receivePermissions(permissions));
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <NavComponent />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
