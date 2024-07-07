import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setUser, setStatus, setError, logout } from "./movies/movieSlice";

export const createUser = (email, password) => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

// export const loginUser = (email, password) => async (dispatch) => {
//   dispatch(setStatus("loading"));
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     dispatch(setUser(userCredential.user));
//     dispatch(setStatus("succeeded"));
//   } catch (error) {
//     dispatch(setError(error.message));
//     dispatch(setStatus("failed"));
//   }
// };

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    console.error("Login failed: ", error.message);
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const monitorAuthState = () => (dispatch) => {
  dispatch(setStatus("Loading"));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
      dispatch(setStatus("succeeded"));
    } else {
      dispatch(setUser(null));
      dispatch(setStatus("idle"));
    }
  });
};
