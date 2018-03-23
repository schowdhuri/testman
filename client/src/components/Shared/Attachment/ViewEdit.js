import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import Title from "components/Shared/Title";


class ViewEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.attachment.name
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleChangeName(val) {
        this.setState({ name: val });
    }
    handleSave() {
        this.props.onSave({
            ...this.props.attachment,
            name: this.state.name
        });
    }
    render() {
        const {
            attachment,
            isImage,
            onCancel,
            onDownload,
            show
        } = this.props;
        const { created, name, path, user } = attachment;

        return (<Modal show={show} className="view-attachment-modal">
            <Modal.Header>
                <Modal.Title>
                    <Title placeholder="Name" onUpdate={this.handleChangeName} value={name} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isImage
                    ? <div className="image">
                        <img src={path} alt={name} />
                    </div>
                    : null}
                <div className="details">
                    {user
                        ? <div className="info" title="Uploaded by">
                            <i className="glyphicon glyphicon-user text-info" />
                            {user.name}
                        </div>
                        : null}

                    <div className="info" title="Uploaded at">
                        <i className="glyphicon glyphicon-time text-info" />
                        {created}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onCancel}>Close</Button>
                <Button bsStyle="info" onClick={onDownload}>Download</Button>
                <Button
                    bsStyle="success"
                    onClick={this.handleSave}
                    disabled={name==this.state.name}
                >Save</Button>
            </Modal.Footer>
        </Modal>);
    }
}
ViewEdit.propTypes = {
    attachment: PropTypes.shape({
        created: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    }).isRequired,
    isImage: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default ViewEdit;
