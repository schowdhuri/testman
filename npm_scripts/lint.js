import { CLIEngine }  from "eslint"

import { chalkSuccess } from "./ChalkConfig";

process.env.NODE_ENV = "linting";

const cli = new CLIEngine({ fix: true });

const report = cli.executeOnFiles([
    "common/**/*.js",
    // "client/**/*.js",
    "server/**/*.js"
]);

const formatter = cli.getFormatter();

if(!report.errorCount && !report.warningCount) {
    console.log(chalkSuccess("All rules passed"));
} else {
    console.log(formatter(report.results));
}
