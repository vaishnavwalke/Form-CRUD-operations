import React from "react";
import styled from "styled-components";
import { Form } from "./Form";
const Home = () => {
  return (
    <Component>
      <h1>Employee Registration Form</h1>
      <Form />
    </Component>
  );
};

export default Home;
const Component = styled.div`
  align-items: center;
  h1 {
    color: var(--Dark-blue_01, #314363);
    font-family: Montserrat;
    font-size: 45px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 63px */
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    margin-top: 239px;
    margin-bottom: 46px;
  }
`;
