import React, { Component } from 'react';
import { addProduct } from '../../services/productsService';
import { connect } from "react-redux";

class AddProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {name: '', price: 0, currency: 'USD'},
            isLoading: false,
            isAdded: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({isLoading: true});
        addProduct(this.state.product).then((isAdded) => {
            this.setState({
                product: {name: '', price: 0, currency: 'USD'},
                isLoading: false,
                isAdded: isAdded
            });
        });
        
    }

    handleChange(event) {
        this.setState({product: { ...this.state.product, [event.target.name]: event.target.value } });
    }
    render() {
        if (this.state.isLoading) {
            return (<div>Loading</div>);
        }
        let message;
        if (this.state.isAdded) {
            message = (<div>The product was added</div>);
        }

        if (this.state.isAdded === false) {
            message = (<div>There was an issue when adding the product</div>);
        }
        return(
            <div>
                <h1>Add Product</h1>
                {message}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="product-name">Name:</label>
                    <input id="product-name" 
                    type="text"
                    name="name"
                    value={this.state.product.name}
                    onChange={this.handleChange}></input>

                    <label htmlFor="product-price">Price:</label>
                    <input id="product-price" 
                    type="number"
                    min="0.00" step="0.01"
                    name="price"
                    value={this.state.product.price}
                    onChange={this.handleChange}></input>

                    <label htmlFor="product-currency">Currency:</label>
                    <select id="product-currency" 
                    name="currency"
                    value={this.state.product.currency}
                    onChange={this.handleChange}>
                        <option value="USD">USD</option>
                        <option value="BGN">BGN</option>
                    </select>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    };
}

const AddProduct = connect(
    null,
    mapDispatchToProps
  )(AddProductComponent);
  
export default AddProduct;