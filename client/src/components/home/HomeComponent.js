import React, { Component } from 'react';
import { fetchPermissions } from '../../services/permissionsService';
import { fetchProducts, editProduct, deleteProduct } from '../../services/productsService';
import { connect } from "react-redux";
import { readProperty, editProperty, deleteProperty } from '../../config';
import ModalComponent from '../modal/ModalComponent';
import ProductFormComponent from '../products/ProductFormComponent';

class HomeComponent extends Component {
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
            failedToUpdate: false,
            faledToDelete: false
        };

        this.openEdit = this.openEdit.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.submitEditModal = this.submitEditModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.submitDeleteModal = this.submitDeleteModal.bind(this);
        this.onProductChange = this.onProductChange.bind(this);
    }

    closeEditModal() {
        this.setState({ openEdit: false });
    }

    submitEditModal() {
        this.setState({ openEdit: false });
        editProduct(this.state.updatedProduct).then((isUpdated) => {
            if (!isUpdated) {
                this.setState({failedToUpdate: true})
                return;
            }
            this.props.fetchProducts();

        })
    }

    closeDeleteModal() {
        this.setState({ openDelete: false });
    }

    submitDeleteModal() {
        this.setState({ openDelete: false });
        deleteProduct(this.state.selectedProduct).then((faledToDelete) => {
            if (!faledToDelete) {
                this.setState({faledToDelete: true})
                return;
            }
            this.props.fetchProducts();

        })
    }

    onProductChange(product) {
        this.setState({updatedProduct: product})
    }

    openEdit(product) {
        this.setState({openEdit: true, selectedProduct: product});
    }

    openDelete(product) {
        this.setState({openDelete: true, selectedProduct: product});
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
                return;
            }
            // if the user does not have the READ permission
            // remove the loading indicator
            this.setState({isLoading: false})
            
        });
    }

    render() {
        if (this.state.isLoading && !this.props.products.areLoaded) {
            return (<div>Loading</div>);
        }
        if (!this.state.hasReadPermissions) {
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
                        onProductChange={this.onProductChange}/>
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