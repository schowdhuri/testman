import React from "react";

import Logo from "common/images/TestMan.png";
import Button from "common/images/google_signin.png";

const LoginApp = () => (<div className="login">
    <img src={Logo} alt="TestMan Logo" className="logo" />
    <h1>TestMan</h1>
    <a className="btn btn-login" href="/auth/google">
        <img src={Button} alt="Sign in with Google" />
    </a>
</div>);

export default LoginApp;
