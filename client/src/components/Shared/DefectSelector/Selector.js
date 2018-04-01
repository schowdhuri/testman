import React from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "react-bootstrap";

import GroupMultiSelect from "components/Shared/GroupMultiSelect";

import "sass/components/DefectSelector.scss";

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preSelectedItems: props.selectedItems || []
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }
    handleClose() {
        this.props.onClose(this.state.preSelectedItems);
    }
    handleEnter() {
        this.props.onInit();
    }
    handleSave() {
        this.props.onSave(
            this.props.selectedItems,
            this.props.importActionContract
        );
    }
    render() {
        const {
            allowAdd,
            allowAddFolder,
            items,
            onDeselect,
            onDeselectAll,
            onSelect,
            onSelectAll,
            readOnly,
            selectedItems,
            show
        } = this.props;

        return (<Modal
            show={show}
            onEnter={this.handleEnter}
            className="defect-selector-modal"
            onHide={this.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Select Defects</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="defect-selector">
                    <GroupMultiSelect
                        items={items}
                        allowAdd={allowAdd}
                        allowAddFolder={allowAddFolder}
                        onChangePath={() => {}}
                        onDeselectAll={onDeselectAll}
                        onDeselectItem={onDeselect}
                        onSelectItem={onSelect}
                        onSelectAll={onSelectAll}
                        selectedItems={selectedItems}
                        readOnly={readOnly} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="success" onClick={this.handleSave} disabled={!selectedItems.length}>Ok</Button>
            </Modal.Footer>
        </Modal>);
    }
}
Selector.propTypes = {
    allowAdd: PropTypes.bool,
    allowAddFolder: PropTypes.bool,
    importActionContract: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    onClose: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onDeselectAll: PropTypes.func.isRequired,
    onInit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    selectedItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    show: PropTypes.bool
};

export default Selector;
