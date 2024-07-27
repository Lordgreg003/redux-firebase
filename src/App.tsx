// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  GetTodoById,
  GetAllTodos,
} from "./screens/index";
// import UpdateTodo from "./screens/UpdateTodo";
// import DeleteTodo from "./screens/DeleteTodo";
// import GetTodoById from "./screens/GetTodoById";
// import GetAllTodos from "./screens/GetAllTodos";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetAllTodos />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
        <Route path="/delete/:id" element={<DeleteTodo />} />
        <Route path="/view/:id" element={<GetTodoById />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
