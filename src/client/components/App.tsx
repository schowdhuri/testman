import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

// import history from "../utils/history";
import TestCases from "./TestCases/List";
import ExecCycles from "./ExecCycles/List";
import DefectList from "./Defects/List";

import "./App.css";

interface AppProps {
  children?: any;
}

const App: FunctionComponent<AppProps> = (props: AppProps) => (
  <Wrapper>
    <Card>
      <Router>
        <Switch>
          <Route path="/" exact>
            <DefectList />
          </Route>
          <Route path="/testplan" exact>
            <TestCases />
          </Route>
          <Route path="/testplan/:id">
            <TestCases />
          </Route>
          <Route path="/execcycle" exact>
            <ExecCycles />
          </Route>
          <Route path="/execcycle/:id">
            <ExecCycles />
          </Route>
        </Switch>
      </Router>
      </Card>
  </Wrapper>
);

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  @media all and (min-width: 780px) {
    padding: 2rem;
  }
`;
const Card = styled.div`
  padding: 2rem 1rem;
  width: 100vw;
  @media all and (min-width: 780px) {
    background: #e2e2e2;
    border-radius: 16px;
    box-shadow: 20px 20px 60px #c0c0c0, -20px -20px 60px #ffffff;
    max-width: 60rem;
    padding: 2rem;
    width: 80vw;
  }
`;

export default App;
