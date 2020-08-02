import React, { Component } from 'react';

class AddProductComponent extends Component {
    render() {
        return(
            <div>
                <h1>Add Product</h1>
                <form>
                    <label for="product-name">Name:</label>
                    <input id="product-name" type="text" name="productName"></input>

                    <label for="product-cost">Cost:</label>
                    <input id="product-cost" type="text" name="productCost"></input>

                    <label for="product-currency">Currency:</label>
                    <select id="product-currency" name="productCurrency">
                        <option value="USD">USD</option>
                        <option value="BGN">BGN</option>
                    </select>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default AddProductComponent;