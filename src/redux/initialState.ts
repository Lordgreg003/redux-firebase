// src/redux/initialState.ts
import { ReduxResponseType } from "./types/types";

export const initialState: ReduxResponseType = {
  loading: false,
  success: false,
  serverResponse: {
    data: [],
    message: "",
    success: false,
  },
  error: null,
};
