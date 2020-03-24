import React, { FunctionComponent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import Temp from "./Temp";
import { getExecCycles } from "../../graphql/queries";

interface ExecCycleListProps {}

const ExecCycleList: FunctionComponent<ExecCycleListProps> = () => {
  const { id } = useParams();
  console.log(id)
  const { loading, error, data: ecData } = useQuery(getExecCycles());
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/</p>;
  // render
  return (
    <Wrapper>
      <ExecCycles>
        <ul>
          {ecData.getExecCycles.map(ec => (
            <li key={`tp-${ec.id}`}>
              <a href={`/execcycle/${ec.id}`}>{ec.name}</a>
            </li>
          ))}
        </ul>
      </ExecCycles>
      <Temp />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const ExecCycles = styled.div`

`;

export default ExecCycleList;
