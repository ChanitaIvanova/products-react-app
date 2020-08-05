import React, { useEffect, useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from '../home/HomeComponent';
import AddProduct from '../products/AddProductComponent';
import { fetchPermissions } from '../../services/permissionsService';
import { addProperty } from '../../services/permissions.constants';
import './Nav.scss';

const NavComponent = () => {
    const [canAddProduct, setCanAddProduct] = useState(false);
    const checkPermissions = () => {
        fetchPermissions().then((permissions) => {
            if (permissions.indexOf(addProperty) !== -1) {
                setCanAddProduct(true);
            }
        });
    };

    useEffect(checkPermissions, []);

    return (
        <div>
            <ul className='horizontal'>
                <li>
                    <NavLink exact activeClassName='active' to='/'>
                        Home
                    </NavLink>
                </li>
                {canAddProduct && (
                    <li>
                        <NavLink activeClassName='active' to='/add'>
                            Add Product
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/add' component={AddProduct}></Route>
                </Switch>
            </div>
        </div>
    );
};

export default NavComponent;
