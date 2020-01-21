/**
 *
 * Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconClose from '../../icons/IconClose';
import './index.scss';

const Modal = ({ modalHeader, modalContent, modalFooter, modalClass, onCancel, canCloseFromOverlay, hasFooter, hasHeader }) => {
    const closeFromOverlay = () => {
        if (canCloseFromOverlay) {
            onCancel();
        }
    };

    const getContent = () => {
        if (hasFooter) {
            return (
                <>
                    <div className="modalContent">{modalContent}</div>
                    <div className="modalFooter">{modalFooter}</div>
                </>
            );
        }

        return <>{modalContent}</>;
    };

    return (
        <div className="modal">
            <div className={`modalInnerContent ${modalClass}`}>
                {hasHeader && (
                    <div className="modalHeader">
                        <div className="modalTitle">{modalHeader}</div>
                        <button type="button" onClick={onCancel} className="btn close">
                            <IconClose size={14} />
                        </button>
                    </div>
                )}
                {getContent()}
            </div>
            <span role="button" tabIndex={0} className="backdropOverlay" onClick={closeFromOverlay} />
        </div>
    );
};

Modal.propTypes = {
    modalClass: PropTypes.string,
    modalHeader: PropTypes.any,
    modalContent: PropTypes.any,
    modalFooter: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    canCloseFromOverlay: PropTypes.bool,
    hasFooter: PropTypes.bool,
    hasHeader: PropTypes.bool,
};

Modal.defaultProps = {
    canCloseFromOverlay: true,
    hasFooter: true,
    hasHeader: true,
    modalClass: '',
};

export default Modal;
