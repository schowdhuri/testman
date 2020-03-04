import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actions from "../actions/index";
import Todo from "../../types/todo";
import { getTodos } from "../selectors";
import logo from "../images/logo.svg";
// import "./App.css";

interface CreateTodoProps {}

const CreateTodo: FunctionComponent<CreateTodoProps> = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  // handlers
  const changeName = (ev: React.FormEvent<EventTarget>) => {
    const target = ev.target as HTMLInputElement;
    setName(target.value);
  };
  const createTodo = () => {
    if (name) {
      dispatch(actions.saveTodo({ name, completed: false }));
      setName("");
    }
  };
  const onSubmit = (ev: React.FormEvent<EventTarget>) => {
    ev.preventDefault();
    createTodo();
    return false;
  };
  // render
  return (
    <Form onSubmit={onSubmit}>
      <TextBox
        type="text"
        onChange={changeName}
        value={name}
        placeholder="What's next?"
      />
      <AddButton onClick={createTodo}>
        <i className="fa fa-plus" />
      </AddButton>
    </Form>
  );
};

const Form = styled.form`
  align-items: center;
  display: flex;
  margin-bottom: 2.5rem;
`;
const TextBox = styled.input`
  background: #e2e2e2;
  border: none;
  border-radius: 4px;
  box-shadow: inset 8px 8px 16px #d7d7d7, inset -8px -8px 16px #ededed;
  flex: 1;
  font-size: 1.25rem;
  padding: 1rem;
  @media all and (min-width: 768px) {
    font-size: 1.5rem;
    padding: 2rem;
  }
`;
const AddButton = styled.button`
  align-items: center;
  background: #e2e2e2;
  border: none;
  border-radius: 50%;
  box-shadow:  6px 6px 12px #d7d7d7,
               -6px -6px 12px #ededed;
  color: #17ab26;
  display: flex;
  font-size: 1.25rem;
  justify-content: center;
  height: 3rem;
  margin-left: 1rem;
  width: 3rem;
  transition: background-color 0.2s, color 0.2s;

  @media all and (min-width: 780px) {
    height: 4rem;
    width: 4rem;
  }
  &:active,
  &:target {
    background: #17ab26;
    color: #e3e3e3;
  }
`;

export default CreateTodo;
