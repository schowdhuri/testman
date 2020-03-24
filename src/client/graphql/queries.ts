import { gql } from "apollo-boost";

export const getDefects = () => gql`
  {
    getDefects {
      id
      name
      raisedBy {
        name
      }
      assignedTo {
        username
      }
    }
  }
`;

export const getTestPlans = () => gql`
  query {
    getTestPlans {
      id
      name
      testCases {
        id
        name
        status
      }
    }
  }
`;

export const getExecCycles = () => gql`
  {
    getExecCycles{
      id
      created
      modified
      name
      startDate
      endDate
      testRuns {
        id
        status
      }
    }
  }
`;
