import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteTodo, getAllTodos } from "../redux/action/todoActions";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { Timestamp } from "firebase/firestore"; // Import Timestamp if needed

const formatTimestamp = (timestamp: Timestamp) => {
  // Convert Timestamp to a readable date format
  const date = timestamp.toDate();
  return date.toLocaleDateString(); // You can customize this format
};

const GetAllTodos: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { loading, success, serverResponse, error } = useSelector(
    (state: RootState) => state.GetAllTodo
  );
  const { loading: deleteLoading, error: deleteError } = useSelector(
    (state: RootState) => state.DeleteTodo
  );

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodo(id));
      dispatch(getAllTodos());
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Todos</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Todo
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {deleteError && <p className="text-red-500">{deleteError}</p>}
      {success && serverResponse && serverResponse.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Text</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serverResponse.map((todo: any) => (
              <tr key={todo.id}>
                <td className="py-2 px-4 border-b">{todo.id}</td>
                <td className="py-2 px-4 border-b">{todo.username}</td>
                <td className="py-2 px-4 border-b">{todo.email}</td>
                <td className="py-2 px-4 border-b">{todo.title}</td>
                <td className="py-2 px-4 border-b">
                  {todo.createdAt ? formatTimestamp(todo.createdAt) : "N/A"}
                </td>
                <td className="py-2 px-4 border-b">{todo.text}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/view/${todo.id}`}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/update/${todo.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={deleteLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllTodos;
