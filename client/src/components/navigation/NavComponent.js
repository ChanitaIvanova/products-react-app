import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from '../home/HomeComponent';
import AddProduct from '../products/AddProductComponent';
import { addProperty } from '../../services/permissions.constants';
import { useSelector } from 'react-redux';
import './Nav.scss';

const NavComponent = () => {
    const permissions = useSelector((state) => state.permissions.permissions);

    const canAdd = () => {
        return permissions.indexOf(addProperty) !== -1;
    };

    return (
        <div>
            <ul className='horizontal'>
                <li>
                    <NavLink exact activeClassName='active' to='/'>
                        Home
                    </NavLink>
                </li>
                {canAdd() && (
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
