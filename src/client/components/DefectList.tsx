import React, { FunctionComponent, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { getDefects } from "../queries";

interface DefectListProps {}

const DefectList: FunctionComponent<DefectListProps> = () => {
  const { loading, error, data } = useQuery(getDefects())
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // render
  return (
    <List>
      {data.getDefects.map(defect => (<li>
        <span>{defect.id}</span>
        <span>{defect.name}</span>
        <span>{defect.raisedBy?.name}</span>
        <span>{defect.assignedTo?.name}</span>
      </li>))}
    </List>
  );
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default DefectList;
