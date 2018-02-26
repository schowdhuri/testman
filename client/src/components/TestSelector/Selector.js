import React from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "react-bootstrap";

import GroupMultiSelect from "components/Shared/GroupMultiSelect";

import "sass/components/TestCaseSelector.scss";

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preSelectedItems: []
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        this.setState({
            preSelectedItems: this.props.selectedItems
        });
        this.props.onInit();
    }
    handleClose() {
        this.props.onClose(this.state.preSelectedItems);
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
            onChangePath,
            onDeselect,
            onDeselectAll,
            onSelect,
            onSelectAll,
            readOnly,
            selectedItems,
            show
        } = this.props;
        // const {
        //     allowAdd,
        //     allowAddFolder,
        //     readOnly,
        //     show,
        //     selectedItems
        // } = this.props;
        return (<Modal show={show} className="test-case-selector-modal">
            <Modal.Header>
                <Modal.Title>Import Test Cases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="test-case-selector">
                    <GroupMultiSelect
                        items={items}
                        allowAdd={allowAdd}
                        allowAddFolder={allowAddFolder}
                        onChangePath={onChangePath}
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
                <Button bsStyle="success" onClick={this.handleSave} disabled={!selectedItems.length}>Import</Button>
            </Modal.Footer>
        </Modal>);
    }
}

export default Selector;
