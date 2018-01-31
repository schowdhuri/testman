import React from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

class TCSelector extends React.Component {
    componentDidMount() {
        this.props.fetchTestPlans();
    }
    render() {
        const {
            unselectedItems,
            selectedItems
        } = this.props;
        return (<div className="test-case-selector">
            <div className="unselected">
                <ul className="">
                    {unselectedItems.map(item => (<li key={item.id}>
                        {item.name}
                    </li>))}
                </ul>
            </div>
            <div className="selected">
                <ul className="">
                    {selectedItems.map(item => (<li key={item.id}>
                        {item.name}
                    </li>))}
                </ul>
            </div>
        </div>);
    }
}

export default TCSelector;
