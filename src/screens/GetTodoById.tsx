import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTodoById } from "../redux/action/todoActions";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { Timestamp } from "firebase/firestore"; // Import Timestamp if needed

const formatTimestamp = (timestamp: Timestamp) => {
  // Convert Timestamp to a readable date format
  const date = timestamp.toDate();
  return date.toLocaleDateString(); // You can customize this format
};

const GetTodoById: React.FC = () => {
  const { id } = useParams();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { loading, serverResponse, error } = useSelector(
    (state: RootState) => state.GetByIdTodo
  );
  console.log("Server Response:", serverResponse);
  console.log("Error:", error);

  useEffect(() => {
    if (id) {
      dispatch(getTodoById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!serverResponse) {
    return <p>No data found.</p>;
  }

  const {
    id: todoId,
    username,
    email,
    title,
    text,
    createdAt,
  } = serverResponse;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Todo Details</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p>
          <strong>ID:</strong> {todoId}
        </p>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Title:</strong> {title}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {createdAt ? formatTimestamp(createdAt) : "N/A"}
        </p>
        <p>
          <strong>Text:</strong> {text}
        </p>
      </div>
    </div>
  );
};

export default GetTodoById;
