import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButton: this.props.submitButton || 'Submit',
            cancelButton: this.props.cancelButton || 'Cancel',
            modalTitle: this.props.modalTitle || '',
            submitBtnClass: this.props.submitBtnClass || 'default-btn'
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSubmit() {
        this.props.onSubmit();
    }

    componentDidMount() {
        this.modal = document.createElement("DIV");
        ReactDOM.render(
            <div>
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.modalTitle}</h5>
                            <button type="button" className="close" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button className="default-btn" type="button" onClick={this.handleClose}>{this.state.cancelButton}</button>
                            <button className={this.state.submitBtnClass} type="button" onClick={this.handleSubmit}>{this.state.submitButton}</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="modal-backdrop"></div>    
            </div>,
            document.body.appendChild(this.modal)
          );
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.modal);
        document.body.removeChild(this.modal);
    }
    
    render() {
          return null;
        }
}

export default ModalComponent;