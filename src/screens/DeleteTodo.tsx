// src/screens/DeleteTodo.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteTodo } from "../redux/action/todoActions";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";

const DeleteTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const handleDelete = () => {
    if (id) {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <div>
      <h1>Delete Todo</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTodo;
