import React from "react";
import { shallow } from 'enzyme';
import App from "./App";

describe("App", () => {
  it("renders without exploding", () => {
    const component = shallow(<App />);
    expect(true).to.be(true);
  });
})
