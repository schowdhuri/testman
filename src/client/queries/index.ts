import { gql } from "apollo-boost";

export const getDefects = () => gql`
  {
    getDefects{
      id
      name
      raisedBy{
        name
      }
      assignedTo{
        username
      }
    }
  }
`;
