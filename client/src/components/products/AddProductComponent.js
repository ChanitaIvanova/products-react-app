import React, { Component } from 'react';
import { addProduct } from '../../services/productsService';
import ProductFormComponent from './ProductFormComponent';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {name: '', price: 0, currency: 'USD'},
            isLoading: false,
            isAdded: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(product) {
        this.setState({isLoading: true});
        addProduct(product).then((isAdded) => {
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
                <ProductFormComponent 
                product={this.state.product} 
                displaySubmitButton={true} 
                handleSubmit={this.addProduct} />
            </div>
        )
    }
}
  
export default AddProduct;