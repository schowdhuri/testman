import React, { FunctionComponent, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { getTestPlans } from "../../graphql/queries";

interface TestCaseListProps {}

const TestCaseList: FunctionComponent<TestCaseListProps> = () => {
  const { loading, error, data: tpData } = useQuery(getTestPlans());
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/</p>;
  // render
  return (
    <Wrapper>
      <TestPlans>
        <ul>
          {tpData.getTestPlans.map(tp => (
            <li key={`tp-${tp.id}`}>
              <a href={`/testplans/${tp.id}`}>{tp.name}</a>
            </li>
          ))}
        </ul>
      </TestPlans>
      {/*<TestCases>
        {tcData.getTestCases.map(testCase => (
          <li>
            <span>{testCase.id}</span>
            <span>{testCase.name}</span>
          </li>
        ))}
      </TestCases>*/}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const TestPlans = styled.div`

`;
const TestCases = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default TestCaseList;
