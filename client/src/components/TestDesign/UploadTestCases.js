import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Button, Modal } from "react-bootstrap";


const UploadTestCases = props => {
    const {
        onUpload,
        onCancel,
        show
    } = props;

    const handleDrop = files => {
        if(files && files.length) {
            const file = files[0];
            if(!file || !file.name || !file.size || !file.name.match(/\.csv$/)) {
                Alert.error("Invalid file");
                return;
            }
            props.onUpload(files[0]);
        }
    };

    return (<Modal show={show} className="upload-test-cases-modal">
        <Modal.Header>
            <Modal.Title>Upload Test Cases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Dropzone
                className="dropzone"
                multiple={false}
                onDrop={handleDrop}
            >
                <div>
                    {"Drop CSV here or click to browse"}
                </div>
            </Dropzone>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onCancel}>Cancel</Button>
            <Button bsStyle="success" onClick={onUpload}>Upload</Button>
        </Modal.Footer>
    </Modal>);
};
UploadTestCases.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default UploadTestCases;
