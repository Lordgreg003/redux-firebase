// src/redux/store.ts
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  createTodoReducer,
  updateTodoReducer,
  deleteTodoReducer,
  getTodoByIdReducer,
  getAllTodosReducer,
} from "./reducers/todoReducer";

export interface RootState {
  CreateTodo: any;
  UpdateTodo: any;
  DeleteTodo: any;
  GetByIdTodo: any;
  GetAllTodo: any;
}

const reducer = combineReducers({
  CreateTodo: createTodoReducer,
  UpdateTodo: updateTodoReducer,
  DeleteTodo: deleteTodoReducer,
  GetByIdTodo: getTodoByIdReducer,
  GetAllTodo: getAllTodosReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
