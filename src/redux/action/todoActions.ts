// src/redux/actions/todoActions.ts
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { RootState } from "../store";
import {
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  GETBYID_TODO_REQUEST,
  GETBYID_TODO_SUCCESS,
  GETBYID_TODO_FAIL,
  GET_ALL_TODO_REQUEST,
  GET_ALL_TODO_SUCCESS,
  GET_ALL_TODO_FAIL,
} from "../constants/todoConstants";
import { db } from "../../routes";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Todo } from "../types/types";
// import {  CreateTodoType} from "../types/types";

const todosCollection = collection(db, "todos");

export const createTodo =
  (todo: {
    username: string;
    email: string;
    title: string;
    text: string;
  }): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch: Dispatch, getState) => {
    try {
      dispatch({ type: CREATE_TODO_REQUEST });
      const docRef = await addDoc(todosCollection, todo);
      dispatch({
        type: CREATE_TODO_SUCCESS,
        payload: { id: docRef.id, ...todo },
      });
    } catch (error: any) {
      dispatch({ type: CREATE_TODO_FAIL, payload: error.message });
    }
  };

export const updateTodo =
  (
    id: string,
    todo: Partial<Todo>
  ): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TODO_REQUEST });
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, todo);
      const updatedTodo = (await getDoc(todoRef)).data();
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: { id, ...updatedTodo } });
    } catch (error: any) {
      dispatch({ type: UPDATE_TODO_FAIL, payload: error.message });
    }
  };

export const deleteTodo =
  (id: string): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_TODO_REQUEST });
      await deleteDoc(doc(db, "todos", id));
      dispatch({ type: DELETE_TODO_SUCCESS, payload: id });

      // Refetch todos after deletion
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: GET_ALL_TODO_SUCCESS, payload: todos });
    } catch (error: any) {
      dispatch({ type: DELETE_TODO_FAIL, payload: error.message });
    }
  };

export const getTodoById =
  (id: string): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: GETBYID_TODO_REQUEST });
      const docSnap = await getDoc(doc(db, "todos", id));
      if (docSnap.exists()) {
        dispatch({
          type: GETBYID_TODO_SUCCESS,
          payload: { id, ...docSnap.data() },
        });
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      dispatch({ type: GETBYID_TODO_FAIL, payload: error.message });
    }
  };

export const getAllTodos =
  (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_TODO_REQUEST });
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() } as Todo);
      });
      dispatch({ type: GET_ALL_TODO_SUCCESS, payload: todos });
    } catch (error: any) {
      dispatch({ type: GET_ALL_TODO_FAIL, payload: error.message });
    }
  };
