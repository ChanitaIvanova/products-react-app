import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    fetchProducts,
    editProduct,
    deleteProduct,
} from '../../services/productsService';
import {
    readProperty,
    editProperty,
    deleteProperty,
} from '../../services/permissions.constants';
import ModalComponent from '../modal/ModalComponent';
import ProductFormComponent from '../products/ProductFormComponent';
import LoadingBar from '../common/LoadingBarComponent';
import Message from '../common/MessageComponent';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
    const permissions = useSelector((state) => state.permissions.permissions);
    const products = useSelector((state) => state.products.products);
    const areLoading = useSelector((state) => state.products.areLoading);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [isUpdateFormValid, setIsUpdateFormValid] = useState(true);
    const updatedProductRef = useRef();
    const isUpdateFormValidRef = useRef();

    useEffect(() => {
        updatedProductRef.current = updatedProduct;
        isUpdateFormValidRef.current = isUpdateFormValid;
    });

    /**
     * Sets the openEdit flag to true to mark the Edit modal as open
     * sets the selectedProduct and updatedProduct in the scope
     * @param {name: string, price: number, currency: string} product
     */
    const openEditDialog = (product) => {
        setOpenEdit(true);
        setSelectedProduct(product);
        setUpdatedProduct(product);
    };

    /**
     * Sets the openEdit flag to false to mark the Edit modal as closed
     */
    const closeEditModal = () => {
        setOpenEdit(false);
    };

    /**
     * When the data in the dialog is not valid - nothing happens
     * When the data is valid, closes the modal,
     * shows loading indicator, updates the product and fecthes the products again
     */
    const submitEditModal = useCallback(() => {
        if (!isUpdateFormValidRef.current) {
            return;
        }

        setOpenEdit(false);
        setIsLoading(true);
        editProduct(updatedProductRef.current).then((isUpdated) => {
            setIsLoading(false);
            if (!isUpdated) {
                return;
            }
            dispatch(fetchProducts());
        });
        // eslint-disable-next-line
    }, [isUpdateFormValidRef, updatedProductRef]);

    /**
     * Sets the openDelete flag to true to mark the Delete product modal as open
     * sets the selectedProduct
     * @param {name: string, price: number, currency: string} product
     */
    const openDeleteDialog = (product) => {
        setOpenDelete(true);
        setSelectedProduct(product);
    };

    /**
     * Sets the openDelete flag to false to mark the Delet product modal as closed
     */
    const closeDeleteModal = () => {
        setOpenDelete(false);
    };

    /**
     * Closes the modal, shows loading indicator,
     * deltes the product and fecthes the products again
     */
    const submitDeleteModal = () => {
        setOpenDelete(false);
        setIsLoading(true);
        deleteProduct(selectedProduct).then((faledToDelete) => {
            setIsLoading(false);
            if (!faledToDelete) {
                return;
            }
            dispatch(fetchProducts());
        });
    };

    const onProductChange = (product) => {
        setUpdatedProduct(product);
    };

    const onFormValidationChange = (isValid) => {
        setIsUpdateFormValid(isValid);
    };

    const getProducts = () => {
        dispatch(fetchProducts());
    };

    const canRead = () => {
        return permissions.indexOf(readProperty) !== -1;
    };

    const canEdit = () => {
        return permissions.indexOf(editProperty) !== -1;
    };

    const canDelete = () => {
        return permissions.indexOf(deleteProperty) !== -1;
    };

    useEffect(getProducts, []);

    if (isLoading || areLoading) {
        return <LoadingBar />;
    }
    if (!canRead()) {
        return (
            <Message
                messageText={
                    'You do not have permissions to view the list of products!'
                }
                level={'failed'}
            />
        );
    }
    if (products.length === 0) {
        return <Message messageText={'There are no available products.'} />;
    }

    const tableRows = products.map((product) => (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.currency}</td>
            {(canEdit() || canDelete()) && (
                <td>
                    {canEdit() && (
                        <button
                            className='primary-btn'
                            onClick={() => openEditDialog(product)}
                        >
                            Edit
                        </button>
                    )}
                    {canDelete() && (
                        <button
                            className='danger-btn'
                            onClick={() => openDeleteDialog(product)}
                        >
                            Delete
                        </button>
                    )}
                </td>
            )}
        </tr>
    ));
    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Currency</th>
                        {(canEdit() || canDelete()) && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            {openEdit && (
                <ModalComponent
                    modalTitle={'Edit product'}
                    onClose={closeEditModal}
                    onSubmit={submitEditModal}
                    submitBtnClass={'primary-btn'}
                >
                    <ProductFormComponent
                        product={selectedProduct}
                        displaySubmitButton={false}
                        onProductChange={onProductChange}
                        onFormValidationChange={onFormValidationChange}
                    />
                </ModalComponent>
            )}

            {openDelete && (
                <ModalComponent
                    modalTitle={'Delete product'}
                    onClose={closeDeleteModal}
                    onSubmit={submitDeleteModal}
                    submitButton={'Delete'}
                    submitBtnClass={'danger-btn'}
                >
                    <div>Are you sure you want to delete this product?</div>
                </ModalComponent>
            )}
        </div>
    );
};

export default Home;
