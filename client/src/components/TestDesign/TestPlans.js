import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TestPlansToolbar from "./TestPlansToolbar";

import "sass/components/TestPlans.scss";

class TestPlans extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        this.props.onInit();
    }
    handleSelect(testPlan) {
        this.props.onSelect(testPlan);
    }
    render() {
        const { testPlans } = this.props;
        return (<div className="test-plans">
            <TestPlansToolbar />
            <ul>
                {testPlans.map(tp => (<li
                    className={`${tp.selected ? "bg-success selected" : ""}`}
                    key={tp.id}
                    onClick={() => this.handleSelect(tp)}
                >
                    {tp.name}
                </li>))}
            </ul>
        </div>);
    }
}
TestPlans.propTypes = {
    onInit: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default TestPlans;
