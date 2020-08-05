import React, { useState } from 'react';
import ValidationBanner from '../forms/ValidationBannerComponent';

const ProductFormComponent = ({
    product,
    displaySubmitButton,
    handleSubmit,
    onProductChange,
    onFormValidationChange,
}) => {
    const [editedProduct, setProduct] = useState(product);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);

    /**
     * WHEN the form's submit button is enabled (displaySubmitButton is set to true)
     * this is the handler that checks if the form is valid and only if it is
     * it calls the provided call back handleSubmit through the properties
     * Lastly after the submit the form fields are reset
     * @param {Event} event
     */
    const onSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        handleSubmit(editedProduct);
        setProduct(product);
    };

    /**
     * Set the new product to the change and if onProductChange is provided, pass the new
     * product to the parent component
     * @param {Event} event
     */
    const handleChange = (event) => {
        const newProduct = {
            ...editedProduct,
            [event.target.name]: event.target.value,
        };
        setProduct(newProduct);
        if (onProductChange) {
            onProductChange(newProduct);
        }
    };

    const validateName = () => {
        let isValid = true;
        if (!editedProduct.name.trim()) {
            setIsNameValid(false);
            isValid = false;
        } else {
            setIsNameValid(true);
        }
        if (onFormValidationChange) {
            onFormValidationChange(isValid && isPriceValid);
        }

        return isValid;
    };

    const validatePrice = () => {
        let isValid = true;
        if (
            !editedProduct.price ||
            editedProduct.price <= 0 ||
            isNaN(editedProduct.price)
        ) {
            setIsPriceValid(false);
            isValid = false;
        } else {
            setIsPriceValid(true);
        }

        if (onFormValidationChange) {
            onFormValidationChange(isValid && isNameValid);
        }

        return isValid;
    };

    const formatPrice = () => {
        const newPrice = parseFloat(editedProduct.price).toFixed(2);
        const newProduct = { ...editedProduct, price: newPrice };
        setProduct(newProduct);
        if (onProductChange) {
            onProductChange(newProduct);
        }
    };

    /**
     * Returns true if both the name and the price have valid values
     * If onFormValidationChange is provided pass the valididty status
     * to the parent component
     */
    const validateForm = () => {
        let isValid = true;
        if (!validateName()) {
            isValid = false;
        }

        if (!validatePrice()) {
            isValid = false;
        }

        if (onFormValidationChange) {
            onFormValidationChange(isValid);
        }
        return isValid;
    };

    return (
        <form>
            <label htmlFor='product-name'>Name:</label>
            <input
                id='product-name'
                type='text'
                name='name'
                value={editedProduct.name}
                onChange={handleChange}
                onBlur={validateName}
            ></input>
            <ValidationBanner
                display={!isNameValid}
                errorMessage={'Please enter a name for the product!'}
            />

            <label htmlFor='product-price'>Price:</label>
            <input
                id='product-price'
                type='number'
                min='0.00'
                step='0.01'
                name='price'
                value={editedProduct.price}
                onChange={handleChange}
                onBlur={() => {
                    validatePrice();
                    formatPrice();
                }}
            ></input>
            <ValidationBanner
                display={!isPriceValid}
                errorMessage={'The price should be larger than 0!'}
            />

            <label htmlFor='product-currency'>Currency:</label>
            <select
                id='product-currency'
                name='currency'
                value={editedProduct.currency}
                onChange={handleChange}
            >
                <option value='USD'>USD</option>
                <option value='BGN'>BGN</option>
            </select>
            {displaySubmitButton && (
                <button className='primary-btn' onClick={onSubmit}>
                    Add
                </button>
            )}
        </form>
    );
};

export default ProductFormComponent;
