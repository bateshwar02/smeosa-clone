import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import DocumentService from '../../../../common/services/document';
import Utils from '../../utils/common';

const imageSupport = ['png', 'jpg', 'jpeg', 'gif'];

export default class DocumentPreview extends Component {
    static renderImg(document) {
        return <img src={document.url} alt={document.name} className="img-responsive" />;
    }

    static renderPdf(document) {
        return <object id="pdfPane" type="application/pdf" aria-label="document" data={document.url} />;
    }

    static renderOther() {
        return (
            <div className="document-preview-not-available">
                <p>Preview not available.</p>
            </div>
        );
    }

    // static getDocumentUrl(document) {
    //     // return DocumentService.getDocumentUrl(document)
    //     //     .then(response => response)
    //     //     .catch(() => ({
    //     //         success: false,
    //     //         errorMessage: 'Something went wrong while fetching details file server',
    //     //     }));
    // }

    constructor(props) {
        super(props);
        this.state = {
            document: null,
        };
    }

    componentDidMount() {
        const document = this.props.file;
        this.setDocumentInState(document);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        const document = nextProps.file;
        this.setDocumentInState(document);
    }

    setDocumentInState(document) {
        if (Utils.isUndefinedOrNullOrEmptyObject(document)) {
            return;
        }
        DocumentPreview.getDocumentUrl(document)
            .then(response => {
                if (response.success) {
                    const newDoc = document;
                    newDoc.url = response.data;
                    this.setState({ document: newDoc });
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    changeDocument = action => {
        let currentDocument = this.props.currentIndex;
        const totalDocuments = this.props.files.length - 1;
        if (action === 'next') {
            currentDocument = currentDocument >= totalDocuments ? 0 : currentDocument + 1;
            this.props.changeFilePreview(this.props.files[currentDocument], currentDocument);
        } else if (action === 'prev') {
            currentDocument = currentDocument <= 0 ? totalDocuments : currentDocument - 1;
            this.props.changeFilePreview(this.props.files[currentDocument], currentDocument);
        } else {
            throw new Error('wrong action selected');
        }
    };

    downloadFile = () => {
        window.open(this.state.document.url, '_blank');
    };

    renderDocument() {
        const { document } = this.state;
        if (Utils.isUndefinedOrNullOrEmptyObject(document)) {
            return null;
        }
        const tempFile = document.storagePath.split('.');
        const extenstion = tempFile[tempFile.length - 1];
        if (Utils.isUndefinedOrNullOrEmpty(extenstion)) {
            return DocumentPreview.renderOther();
        }
        if (imageSupport.indexOf(extenstion.toLowerCase()) > -1) {
            return DocumentPreview.renderImg(document);
        }
        if (extenstion.toLowerCase() === 'pdf') {
            return DocumentPreview.renderPdf(document);
        }
        return DocumentPreview.renderOther();
    }

    render() {
        return (
            <div className="modal fade" role="dialog" id={`${this.props.name}-preview-modal`}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">
                                {!Utils.isUndefinedOrNullOrEmpty(this.state.document) && (
                                    <div>
                                        {this.state.document.documentName}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                this.downloadFile();
                                            }}
                                            className="btn btn-xs btn-oxy-blue pull-right download-document-btn"
                                        >
                                            <i className="material-icons">file_download</i> Download
                                        </button>
                                    </div>
                                )}
                            </h4>
                        </div>
                        <div className="modal-body document-preview">
                            <div className="document-container">
                                {this.renderDocument()}
                                <button
                                    type="button"
                                    className="download-preview-btn prev-btn"
                                    onClick={() => {
                                        this.changeDocument('prev');
                                    }}
                                >
                                    <i className="material-icons">keyboard_arrow_left</i>
                                </button>
                                <button
                                    type="button"
                                    className="download-preview-btn next-btn"
                                    onClick={() => {
                                        this.changeDocument('next');
                                    }}
                                >
                                    <i className="material-icons">keyboard_arrow_right</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DocumentPreview.propTypes = {
    name: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
    file: PropTypes.object.isRequired,
    currentIndex: PropTypes.string.isRequired,
    changeFilePreview: PropTypes.func.isRequired,
};
