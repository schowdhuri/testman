import React from "react";
import PropTypes from "prop-types";
import PathTree from "./PathTree";

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTree: false
        };
        this.handleNav = this.handleNav.bind(this);
        this.handleNavUp = this.handleNavUp.bind(this);
        this.handleTreeClose = this.handleTreeClose.bind(this);
        this.handleTreeOpen = this.handleTreeOpen.bind(this);
        this.toggleTree = this.toggleTree.bind(this);
    }
    handleNav(item) {
        this.props.onNav(item);
    }
    handleNavUp() {
        this.props.onNavUp();
    }
    handleTreeClose() {
        this.setState({
            showTree: false
        });
    }
    handleTreeOpen() {
        this.setState({
            showTree: true
        });
    }
    toggleTree() {
        this.setState({
            showTree: !this.state.showTree
        });
    }
    render() {
        const { path, onNav} = this.props;
        const { showTree } = this.state;
        return (<ul className="breadcrumb">
            <li>
                {path && path.length
                    ? <a href="javascript:;" onClick={this.handleNav}><i className="glyphicon glyphicon-home" /></a>
                    : <span><i className="glyphicon glyphicon-home" /></span>}
            </li>
            {path && path.length ? <li>{path[path.length-1].name}</li> : null}
            {path && path.length > 1
                ? (<li className="overflow" onClick={this.toggleTree}>
                    <i className="fa fa-chevron-down" />
                    {showTree ? <PathTree path={path} onClose={this.handleTreeClose} onNav={onNav} /> : null}
                </li>)
                : null}
            {path && path.length
                ? <li className="back"><a href="javascript:;" onClick={this.handleNavUp}>Back</a></li>
                : null}
        </ul>);
    }
}
Breadcrumb.propTypes = {
    onNav: PropTypes.func.isRequired,
    onNavUp: PropTypes.func.isRequired,
    path: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }))
};

export default Breadcrumb;
