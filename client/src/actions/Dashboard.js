import * as ACTIONS from "constants/DashboardActions";

export const reqSummary = () => ({
    type: ACTIONS.REQ_SUMMARY
});

export const rcvSummary = summary => ({
    type: ACTIONS.RCV_SUMMARY,
    summary
});
