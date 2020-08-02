import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from '../home/HomeComponent';
import AddProductComponent from '../products/AddProductComponent';

class NavComponent extends Component {
    render() {
        return(
            <div>
                <ul>
                    <li>
                    <NavLink exact activeClassName="active" to="/">
                        Home
                    </NavLink>
                    </li>
                    <li>
                    <NavLink activeClassName="active" to="/add">
                        Add Product
                    </NavLink>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/add" component={AddProductComponent}>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default NavComponent;