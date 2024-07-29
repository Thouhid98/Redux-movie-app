import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  setUser,
  setStatus,
  setError,
  logout,
  saveUserToDatabase,
  setToken,
} from "./movies/movieSlice";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import { useDispatch } from "react-redux";

export const createUser =
  (email, password, displayName, photoURL) => async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      dispatch(setUser(user));
      // Sending data to api
      await dispatch(saveUserToDatabase(user));
      dispatch(setStatus("succeeded"));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setStatus("failed"));
    }
  };

// Update user data to firebase
// export const createUser =
//   (email, password, displayName, photoURL) => async (dispatch) => {
//     dispatch(setStatus("loading"));
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       await updateProfile(user, {
//         displayName: displayName,
//         photoURL: photoURL,
//       });
//       dispatch(setUser(user));
//       dispatch(setStatus("succeeded"));
//     } catch (error) {
//       dispatch(setError(error.message));
//       dispatch(setStatus("failed"));
//     }
//   };

// This is first time create User
// export const createUser = (email, password) => async (dispatch) => {
//   dispatch(setStatus("loading"));
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
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
    // Remove token or user data from localStorage
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(setStatus("succeeded"));
    window.location.reload();
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

// export const monitorAuthState = () => (dispatch) => {
//   dispatch(setStatus("Loading"));
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       dispatch(setUser(user));
//       dispatch(setStatus("succeeded"));
//     } else {
//       dispatch(setUser(null));
//       dispatch(setStatus("idle"));
//     }
//   });
// };

export const monitorAuthState = () => async (dispatch) => {
  dispatch(setStatus("loading"));

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const axiosPublic = useAxiosPublic();
        const userInfo = { email: user.email };
        console.log(userInfo);
        const response = await axiosPublic.post("/jwt", userInfo);

        // store token in the localStorage
        const { token } = response.data;
        localStorage.setItem("token", token);

        dispatch(setUser(user));
        dispatch(setToken(token));
        dispatch(setStatus("succeeded"));
      } catch (error) {
        console.log("Failed to fetch Jwt token", error);
        dispatch(setUser(null));
        dispatch(setStatus("idle"));
      }
    } else {
      //Remove token from localstorage
      localStorage.removeItem("token");

      dispatch(setUser(null));
      dispatch(setStatus("idle"));
    }
  });
};
