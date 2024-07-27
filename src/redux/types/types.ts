import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "../store"; //

export type CreateTodoType = {
  username: string;
  email: string;
  title: string;
  text: string;
};

export type GetTodoType = {
  _id: string;
  username: string;
  email: string;
  title: string;
  status: boolean;
  createdAt: string;
};

export type UsersId = {
  id: string | undefined;
};

export type UpdateTodoType = {
  username: string;
  email: string;
  title: string;
  text: string;
  id?: string;
};

export type ViewTodoType = {
  first_name: string;
  last_name: string;
  username: string;
  country: string;
  email: string;
  password: string;
};

export type DeleteTodoType = {
  first_name: string;
  last_name: string;
  username: string;
  country: string;
  email: string;
  password: string;
};

export type passwordUpdateType = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  undefined,
  Action<string>
>;

export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: {
    data: T;
    message: string;
    success: boolean;
  };
  error: any;
};

// export interface Task {
//   _id: string;
//   username: string;
//   email: string;
//   title: string;
//   status: boolean;
//   createdAt: string;
// }
export type ActionType = {
  type: string;
  payload: any;
};

// src/redux/types/types.ts
export interface Todo {
  id: string;
  username: string;
  email: string;
  title: string;
  text: string;
  completed?: boolean; // Optional, depending on your data
}
