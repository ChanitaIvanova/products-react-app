import React, { Component } from 'react';
import { fetchPermissions } from '../../services/permissionsService';
import { fetchProducts, editProduct, deleteProduct } from '../../services/productsService';
import { connect } from "react-redux";
import { readProperty, editProperty, deleteProperty } from '../../config';
import ModalComponent from '../modal/ModalComponent';
import ProductFormComponent from '../products/ProductFormComponent';
import LoadingBar from '../common/LoadingBarComponent';
import Message from '../common/MessageComponent';

export class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasReadPermissions: false,
            hasEditPermissions: false,
            hasDeletePermissions: false,
            openEdit: false,
            openDelete: false,
            selectedProduct: undefined,
            updatedProduct: undefined,
            isUpdateFormValid: true
        };

        this.openEdit = this.openEdit.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.submitEditModal = this.submitEditModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.submitDeleteModal = this.submitDeleteModal.bind(this);
        this.onProductChange = this.onProductChange.bind(this);
        this.onFormValidationChange = this.onFormValidationChange.bind(this);
    }

    /**
     * Sets the openEdit flag to true to mark the Edit modal as open
     * sets the selectedProduct and updatedProduct in the scope
     * @param {name: string, price: number, currency: string} product 
     */
    openEdit(product) {
        this.setState({openEdit: true, selectedProduct: product, updatedProduct: product});
    }

    /**
     * Sets the openEdit flag to false to mark the Edit modal as closed
     */
    closeEditModal() {
        this.setState({ openEdit: false });
    }

    /**
     * When the data in the dialog is not valid - nothing happens
     * When the data is valid, closes the modal,
     * shows loading indicator, updates the product and fecthes the products again
     */
    submitEditModal() {
        if (!this.state.isUpdateFormValid) {
            return;
        }
        this.setState({ openEdit: false });
        this.setState({ isLoading: true });
        editProduct(this.state.updatedProduct).then((isUpdated) => {
            this.setState({ isLoading: false });
            if (!isUpdated) {
                return;
            }
            this.props.fetchProducts();

        });
    }

    /**
     * Sets the openDelete flag to true to mark the Delete product modal as open
     * sets the selectedProduct
     * @param {name: string, price: number, currency: string} product 
     */
    openDelete(product) {
        this.setState({openDelete: true, selectedProduct: product});
    }

    /**
     * Sets the openDelete flag to false to mark the Delet product modal as closed
     */
    closeDeleteModal() {
        this.setState({ openDelete: false });
    }

    /**
     * Closes the modal, shows loading indicator,
     * deltes the product and fecthes the products again
     */
    submitDeleteModal() {
        this.setState({ openDelete: false });
        this.setState({ isLoading: true });
        deleteProduct(this.state.selectedProduct).then((faledToDelete) => {
            this.setState({ isLoading: false });
            if (!faledToDelete) {
                return;
            }
            this.props.fetchProducts();
        });
    }

    onProductChange(product) {
        this.setState({updatedProduct: product});
    }

    onFormValidationChange(isValid) {
        this.setState({isUpdateFormValid: isValid});
    }

    componentDidMount() {
        fetchPermissions().then((permissions) => {
            if (permissions.indexOf(readProperty) !== -1) {
                //if the user has the needed permissions, retrieve the product list
                this.setState({hasReadPermissions: true});
                this.props.fetchProducts();
                if (permissions.indexOf(editProperty) !== -1) {
                    this.setState({hasEditPermissions: true});
                }
                if (permissions.indexOf(deleteProperty) !== -1) {
                    this.setState({hasDeletePermissions: true});
                }
            }
            this.setState({isLoading: false});
        });
    }

    render() {
        if (this.state.isLoading || this.props.areLoading) {
            return (<LoadingBar/>);
        }
        if (!this.state.hasReadPermissions) {
            return (<Message messageText={'You do not have permissions to view the list of products!'} level={'failed'}/>);
        }
        if ( this.props.products.length === 0) {
            return (<Message messageText={'There are no available products.'}/>);
        }
        
        const tableRows = this.props.products.map((product) =>
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.currency}</td>
                { (this.state.hasEditPermissions || this.state.hasDeletePermissions) &&
                    <td>{ this.state.hasEditPermissions && <button className="primary-btn" onClick={() => this.openEdit(product)}>Edit</button>}
                    { this.state.hasDeletePermissions && <button className="danger-btn" onClick={() => this.openDelete(product)}>Delete</button>}
                    </td>
                }
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
                            { (this.state.hasEditPermissions || this.state.hasDeletePermissions) &&
                                <th>Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
                { this.state.openEdit && 
                    <ModalComponent 
                    modalTitle={'Edit product'} 
                    onClose={this.closeEditModal} 
                    onSubmit={this.submitEditModal}
                    submitBtnClass={'primary-btn'} >
                        <ProductFormComponent 
                        product={this.state.selectedProduct} 
                        displaySubmitButton={false}
                        onProductChange={this.onProductChange}
                        onFormValidationChange={this.onFormValidationChange}/>
                    </ModalComponent>
                }

                { this.state.openDelete && 
                    <ModalComponent 
                    modalTitle={'Delete product'} 
                    onClose={this.closeDeleteModal} 
                    onSubmit={this.submitDeleteModal} 
                    submitButton={'Delete'}
                    submitBtnClass={'danger-btn'}>
                        <div>Are you sure you want to delete this product?</div>
                    </ModalComponent>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      products: state.products,
      areLoading: state.areLoading
    }
  }
  
const mapDispatchToProps = dispatch => ({
    fetchProducts: () => { dispatch(fetchProducts())}
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);
  
export default Home;