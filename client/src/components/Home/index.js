import React from "react";
import moment from "moment";

import Logo from "common/images/TestMan.png";
import Button from "common/images/google_signin.png";

const changelog = [{
    date: "20180401",
    changes: [
        "Added landing page",
        "Filter Defects by Status and Assignee",
        "Filter TestRuns by Status"
    ]
}, {
    date: "20180331",
    changes: [
        "Fixed execution cycle routing",
        "Unfinished execution cycles can no longer be stopped"
    ]
}, {
    date: "20180330",
    changes: [
        "First alpha release"
    ]
}];

const HomeApp = () => (<div className="login">
    <section className="login-panel">
        <img src={Logo} alt="TestMan Logo" className="logo" />
        <h1>TestMan</h1>
        <p className="brief">
        A Minimalistic, Open-Source Test-Case Management tool
        </p>
        <a className="btn btn-login" href="/auth/google">
            <img src={Button} alt="Sign in with Google" />
        </a>
    </section>
    <section className="github-buttons">
        <iframe src="https://ghbtns.com/github-btn.html?user=schowdhuri&repo=testman&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="100px"
            height="20px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=schowdhuri&repo=testman&type=watch&count=true&v=2"
            frameBorder="0"
            scrolling="0"
            width="100px"
            height="20px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=schowdhuri&repo=testman&type=fork&count=true"
            frameBorder="0"
            scrolling="0"
            width="100px"
            height="20px"></iframe>
    </section>
    <section className="changelog">
        <h2>What's next?</h2>
        <p>
            Track progress, see what's cooking and know what to expect next
            <br/>
            <a className="btn btn-sm btn-info btn-roadmap" href="https://github.com/schowdhuri/testman/projects/1?fullscreen=true">
                <i className="glyphicon glyphicon-road" />
                {" "}
                v1 Roadmap
            </a>
        </p>

        <h2>Changelog</h2>
        {changelog.map(log => (<React.Fragment key={log.date}>
            <h3>{moment(log.date, "YYYYMMDD").format("MMM DD")}</h3>
            <ul>
                {log.changes.map((change, index) =>
                    <li key={`change-${log.date}-${index}`}>{change}</li>)}
            </ul>
        </React.Fragment>))}
    </section>
    <footer>
        &copy; 2020 Subir Chowdhuri.
        {" "}
        Code released under the <a href="https://github.com/schowdhuri/testman/blob/master/LICENSE">MIT License</a>
    </footer>
</div>);

export default HomeApp;
