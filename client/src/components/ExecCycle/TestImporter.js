import React from "react";
import PropTypes from "prop-types";

import Selector from "components/TestSelector";

const TestImporter = props => {
    const {
        execCycle,
        importActionContract,
        onClose,
        onInit,
        show
    } = props;

    const handleInit = () => props.onInit(props.execCycle)
    return (<Selector
        show={show}
        importActionContract={importActionContract}
        onInit={handleInit}
        onClose={onClose} />);
};
TestImporter.propTypes = {
    execCycle: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    importActionContract: PropTypes.shape({
        type: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        extra: PropTypes.shape({
            execCycle: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            })
        }).isRequired
    }),
    onClose: PropTypes.func.isRequired,
    onInit: PropTypes.func.isRequired,
    show: PropTypes.bool
}
export default TestImporter;
