import React, { Component } from 'react';

class ProductFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            displaySubmitButton: this.props.displaySubmitButton,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({isLoading: true});
        this.props.handleSubmit(this.state.product);
        this.setState({
            product: this.props.product
        });
        
    }

    handleChange(event) {
        const newProduct = { ...this.state.product, [event.target.name]: event.target.value } ;
        this.setState({product: newProduct});
        if (this.props.onProductChange) {
            this.props.onProductChange(newProduct);
        }
    }
    render() {
        return(
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
                { this.state.displaySubmitButton && <input type="submit" value="Submit"/> }
            </form>
        )
    }
}
  
export default ProductFormComponent;