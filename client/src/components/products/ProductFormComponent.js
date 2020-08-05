import React, { Component } from 'react';
import ValidationBanner from '../forms/ValidationBannerComponent';

class ProductFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            displaySubmitButton: this.props.displaySubmitButton,
            isNameValid: true,
            isPriceValid: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePrice = this.validatePrice.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
    }

    /**
     * WHEN the form's submit button is enabled (displaySubmitButton is set to true)
     * this is the handler that checks if the form is valid and only if it is
     * it calls the provided call back handleSubmit through the properties
     * Lastly after the submit the form fields are reset
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }
        this.props.handleSubmit(this.state.product);
        this.setState({
            product: this.props.product,
        });
    }

    /**
     * Set the new product to the change and if onProductChange is provided, pass the new
     * product to the parent component
     * @param {Event} event
     */
    handleChange(event) {
        const newProduct = {
            ...this.state.product,
            [event.target.name]: event.target.value,
        };
        this.setState({ product: newProduct });
        if (this.props.onProductChange) {
            this.props.onProductChange(newProduct);
        }
    }

    validateName() {
        let isValid = true;
        if (!this.state.product.name.trim()) {
            this.setState({ isNameValid: false });
            isValid = false;
        } else {
            this.setState({ isNameValid: true });
        }

        if (this.props.onFormValidationChange) {
            this.props.onFormValidationChange(
                isValid && this.state.isPriceValid
            );
        }

        return isValid;
    }

    validatePrice() {
        let isValid = true;
        if (
            !this.state.product.price ||
            this.state.product.price <= 0 ||
            isNaN(this.state.product.price)
        ) {
            this.setState({ isPriceValid: false });
            isValid = false;
        } else {
            this.setState({ isPriceValid: true });
        }

        if (this.props.onFormValidationChange) {
            this.props.onFormValidationChange(
                isValid && this.state.isNameValid
            );
        }

        return isValid;
    }

    formatPrice() {
        const newPrice = parseFloat(this.state.product.price).toFixed(2);
        const newProduct = { ...this.state.product, price: newPrice };
        this.setState({ product: newProduct });
        if (this.props.onProductChange) {
            this.props.onProductChange(newProduct);
        }
    }

    /**
     * Returns true if both the name and the price have valid values
     * If onFormValidationChange is provided pass the valididty status
     * to the parent component
     */
    validateForm() {
        let isValid = true;
        if (!this.validateName()) {
            isValid = false;
        }

        if (!this.validatePrice()) {
            isValid = false;
        }

        if (this.props.onFormValidationChange) {
            this.props.onFormValidationChange(isValid);
        }
        return isValid;
    }

    render() {
        return (
            <form>
                <label htmlFor='product-name'>Name:</label>
                <input
                    id='product-name'
                    type='text'
                    name='name'
                    value={this.state.product.name}
                    onChange={this.handleChange}
                    onBlur={this.validateName}
                ></input>
                <ValidationBanner
                    display={!this.state.isNameValid}
                    errorMessage={'Please enter a name for the product!'}
                />

                <label htmlFor='product-price'>Price:</label>
                <input
                    id='product-price'
                    type='number'
                    min='0.00'
                    step='0.01'
                    name='price'
                    value={this.state.product.price}
                    onChange={this.handleChange}
                    onBlur={() => {
                        this.validatePrice();
                        this.formatPrice();
                    }}
                ></input>
                <ValidationBanner
                    display={!this.state.isPriceValid}
                    errorMessage={'The price should be larger than 0!'}
                />

                <label htmlFor='product-currency'>Currency:</label>
                <select
                    id='product-currency'
                    name='currency'
                    value={this.state.product.currency}
                    onChange={this.handleChange}
                >
                    <option value='USD'>USD</option>
                    <option value='BGN'>BGN</option>
                </select>
                {this.state.displaySubmitButton && (
                    <button className='primary-btn' onClick={this.handleSubmit}>
                        Add
                    </button>
                )}
            </form>
        );
    }
}

export default ProductFormComponent;
