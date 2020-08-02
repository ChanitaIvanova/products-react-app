import React, { Component } from 'react';
import { fetchPermissions } from '../../services/permissionsService';
import { fetchProducts } from '../../services/productsService';
import { connect } from "react-redux";
import { readProperty } from '../../config';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasPermissions: false
        };
    }

    componentDidMount() {
        fetchPermissions().then((permissions) => {
            if (permissions.indexOf(readProperty) !== -1) {
                //if the user has the needed permissions, retrieve the product list
                this.setState({hasPermissions: true});
                this.props.fetchProducts();
            } else {
                // if the user does not have the READ permission
                // remove the loading indicator
                this.setState({isLoading: false})
            }
        });
    }

    render() {
        if (this.state.isLoading && !this.props.products.areLoaded) {
            return (<div>Loading</div>);
        }
        if (!this.state.hasPermissions) {
            return (<div>You do not have permissions to view the list of products</div>);
        }
        if ( this.props.products.products.length === 0) {
            return (<div>There are no products available</div>);
        }
        
        const tableRows = this.props.products.products.map((product) =>
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.currency}</td>
            </tr>
        );
        return (
            <div>
                <h1>Products</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      products: state.products,
    }
  }
  
const mapDispatchToProps = dispatch => ({
    fetchProducts: () => { dispatch(fetchProducts())},
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);
  
export default Home;