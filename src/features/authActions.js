import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setUser, setStatus, setError } from "./movies/movieSlice";

export const createUser = (email, password) => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    dispatch(setStatus("Succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("Failed"));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    dispatch(setStatus("Succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("Failed"));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut();
    dispatch(setUser(null));
    dispatch(setStatus("idle"));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const monitorAuthState = () => (dispatch) => {
  dispatch(setStatus("Loading"));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
      dispatch(setStatus("Succeeded"));
    } else {
      dispatch(setUser(null));
      dispatch(setStatus("idle"));
    }
  });
};
