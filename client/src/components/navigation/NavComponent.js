import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from '../home/HomeComponent';
import AddProduct from '../products/AddProductComponent';
import { fetchPermissions } from '../../services/permissionsService';
import { addProperty } from '../../config';
import './Nav.css';

class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canAddProduct: false
        };
    }

    componentDidMount() {
        fetchPermissions().then((permissions) => {
            if (permissions.indexOf(addProperty) !== -1) {
                this.setState({canAddProduct: true});
            }
        });
    }
    render() {
        return(
            <div>
                <ul className="horizontal">
                    <li>
                    <NavLink exact activeClassName="active" to="/">
                        Home
                    </NavLink>
                    </li>
                    {this.state.canAddProduct &&
                        <li>
                            <NavLink activeClassName="active" to="/add">
                                Add Product
                            </NavLink>
                        </li>
                    }
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/add" component={AddProduct}>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default NavComponent;