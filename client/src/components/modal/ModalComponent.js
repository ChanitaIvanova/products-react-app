import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const ModalComponent = ({
    submitButton = 'Submit',
    cancelButton = 'Cancel',
    modalTitle = '',
    submitBtnClass = 'default-btn',
    children,
    onClose,
    onSubmit,
}) => {
    let modal;
    const mountDialog = () => {
        modal = document.createElement('DIV');
        ReactDOM.render(
            <div>
                <div className='modal' tabIndex='-1' role='dialog'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{modalTitle}</h5>
                                <button
                                    type='button'
                                    className='close'
                                    aria-label='Close'
                                    onClick={onClose}
                                >
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>{children}</div>
                            <div className='modal-footer'>
                                <button
                                    className='default-btn'
                                    type='button'
                                    onClick={onClose}
                                >
                                    {cancelButton}
                                </button>
                                <button
                                    className={submitBtnClass}
                                    type='button'
                                    onClick={onSubmit}
                                >
                                    {submitButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='modal-backdrop'></div>
            </div>,
            document.body.appendChild(modal)
        );
    };

    const unmountDialog = () => {
        ReactDOM.unmountComponentAtNode(modal);
        document.body.removeChild(modal);
    };
    useEffect(mountDialog, []);
    useEffect(() => {
        return unmountDialog;
        // eslint-disable-next-line
    }, []);
    return null;
};

export default ModalComponent;
