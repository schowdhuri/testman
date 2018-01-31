import React from "react";
import PropTypes from "prop-types";

class PathTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseDownInside: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleNav = this.handleNav.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
    }
    componentDidMount() {
        window.addEventListener("mousedown", this.onClickOutside, false);
    }
    componentWillUnmount() {
        window.removeEventListener("mousedown", this.onClickOutside);
    }
    handleClose() {
        this.props.onClose();
    }
    handleMouseDown() {
        this.setState({ mouseDownInside: true });
    }
    handleMouseUp() {
        this.setState({ mouseDownInside: false });
    }
    handleNav(item) {
        const { path, onNav } = this.props;
        if(path && path.length && item.id !== path[path.length-1].id)
            onNav(item);
    }
    onClickOutside() {
        if(this.state.mouseDownInside)
            return;
        setTimeout(() => this.handleClose(), 100);
        // ^ prevents re-opening PathTree if chevron is clicked
        // remove setTimeout and click on the chevron to see the difference :)
    }
    render() {
        const { path } = this.props;
        return (<div className="path-tree"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}>

            <div className="level active" onClick={() => this.handleNav({})}>
                <i className="fa fa-home" />
            </div>

            {path.map((level, num) => {
                const spacers = [];
                for(let i=1; i<=num + 1; i++) {
                    spacers.push(<div className="spacer" key={`tree-level-${num}-spacer-${i}`} />);
                }
                return (<div
                    className={`level ${num<path.length-1 ? " active" : ""}`}
                    key={`tree-level-${num}`}
                    onClick={() => this.handleNav(level)}
                >
                    {spacers}
                    {num>=0 && num<path.length-1 ? <i className="fa fa-folder" /> : null}
                    {num==path.length-1 ? <i className="fa fa-angle-right" /> : null}
                    <span>{level.name}</span>
                </div>);
            })}
        </div>);
    }
}
PathTree.propTypes = {
    onClose: PropTypes.func.isRequired,
    onNav: PropTypes.func.isRequired,
    path: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }))
};

export default PathTree;
