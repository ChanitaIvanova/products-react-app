import React, { useState } from 'react';
import { addProduct } from '../../services/productsService';
import ProductFormComponent from './ProductFormComponent';
import LoadingBar from '../common/LoadingBarComponent';
import Message from '../common/MessageComponent';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: 0.0,
        currency: 'USD',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState();

    const handleSubmit = (product) => {
        setIsLoading(true);
        addProduct(product).then((isAdded) => {
            setProduct({ name: '', price: 0.0, currency: 'USD' });
            setIsLoading(false);
            setIsAdded(isAdded);
        });
    };
    if (isLoading) {
        return <LoadingBar />;
    }
    let message;
    if (isAdded) {
        message = (
            <Message messageText={'The product was added'} level={'success'} />
        );
    }

    if (isAdded === false) {
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
                product={product}
                displaySubmitButton={true}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddProduct;
