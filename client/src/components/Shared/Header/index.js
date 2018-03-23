import { connect } from "react-redux";
import Header from "./Header";

import { getUser } from "selectors/Shared";

const mapStateToProps = state => ({
    user: getUser(state)
});

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
