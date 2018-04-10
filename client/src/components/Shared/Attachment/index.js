import React from "react";
import PropTypes from "prop-types";

import ViewEdit from "./ViewEdit";

import "./Attachment.scss";

class Attachment extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            modal: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }
    handleDelete() {
        this.props.onDelete(this.props.attachment);
    }
    handleDownload() {
        this.props.onDownload(this.props.attachment);
        this.hideModal();
    }
    handleSave(val) {
        this.props.onSave(val);
        this.hideModal();
    }
    hideModal() {
        this.setState({ modal: false });
    }
    showModal() {
        this.setState({ modal: true });
    }
    render() {
        const {
            allowDelete=true,
            allowEdit=true,
            allowDownload=true,
            attachment
        } = this.props;
        const { name, path, file } = attachment;
        const { modal } = this.state;
        const reExtension = new RegExp("\\.png|\\.jpe?g|\\.gif|\\.svg$", "i");
        const reMime = new RegExp("image/png|image/jpe?g|image/gif|image/svg\\+xml", "i");
        const isImage = Boolean(reExtension.test(path) || (file && reMime.test(file.type)));
        let preview;
        if(isImage) {
            preview = (<div className="image-type">
                <div className="image" style={{backgroundImage: `url(${path})`}} />
                <span className="name">{name}</span>
            </div>);
        } else {
            preview = (<div className="unknown-type">
                <span className="dummy-image">
                    <i className="glyphicon glyphicon-paperclip" />
                </span>
                <span className="name">{name}</span>
            </div>);
        }
        return (<div className="attachment">
            <div className="preview">{preview}</div>
            <div className="controls">
                {!allowDelete || <button className="btn btn-link" onClick={this.handleDelete}>
                    <i className="glyphicon glyphicon-trash text-danger" />
                </button>}
                {!allowDownload || <button className="btn btn-link" onClick={this.handleDownload}>
                    <i className="glyphicon glyphicon-download-alt text-success" />
                </button>}
                {!allowEdit || <button className="btn btn-link" onClick={this.showModal}>
                    <i className="glyphicon glyphicon-zoom-in text-info" />
                </button>}
            </div>
            <ViewEdit show={modal}
                isImage={isImage}
                attachment={attachment}
                onCancel={this.hideModal}
                onDelete={this.handleDelete}
                onDownload={this.handleDownload}
                onSave={this.handleSave} />
        </div>);
    }
}
Attachment.propTypes = {
    attachment: PropTypes.shape({
        created: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    }).isRequired,
    allowDelete: PropTypes.bool,
    allowEdit: PropTypes.bool,
    allowDownload: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired

};

export default Attachment;
