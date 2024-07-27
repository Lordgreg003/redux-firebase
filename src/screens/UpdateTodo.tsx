import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodo } from "../redux/action/todoActions";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";

const UpdateTodo: React.FC = () => {
  const { id } = useParams();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();
  const { serverResponse } = useSelector(
    (state: RootState) => state.GetByIdTodo
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getTodoById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (serverResponse.data) {
      setUsername(serverResponse.data.username);
      setEmail(serverResponse.data.email);
      setTitle(serverResponse.data.title);
      setText(serverResponse.data.text);
    }
  }, [serverResponse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTodo(id, { username, email, title, text }));
    }
    alert("Todo updated successfully!");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Update Todo</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
