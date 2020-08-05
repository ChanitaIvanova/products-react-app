import React, { Component } from 'react';
import { addProduct } from '../../services/productsService';
import ProductFormComponent from './ProductFormComponent';
import LoadingBar from '../common/LoadingBarComponent';
import Message from '../common/MessageComponent';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: { name: '', price: 0.0, currency: 'USD' },
            isLoading: false,
            isAdded: undefined,
        };

        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(product) {
        this.setState({ isLoading: true });
        addProduct(product).then((isAdded) => {
            this.setState({
                product: { name: '', price: 0.0, currency: 'USD' },
                isLoading: false,
                isAdded: isAdded,
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingBar />;
        }
        let message;
        if (this.state.isAdded) {
            message = (
                <Message
                    messageText={'The product was added'}
                    level={'success'}
                />
            );
        }

        if (this.state.isAdded === false) {
            message = (
                <Message
                    messageText={'Failed to add the product'}
                    level={'failed'}
                />
            );
        }
        return (
            <div>
                <h1>Add Product</h1>
                {message}
                <ProductFormComponent
                    product={this.state.product}
                    displaySubmitButton={true}
                    handleSubmit={this.addProduct}
                />
            </div>
        );
    }
}

export default AddProduct;
