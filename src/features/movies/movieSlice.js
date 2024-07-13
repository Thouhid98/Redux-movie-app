import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
import axios from "axios";

// Apis for ShowMovies and MovieDetails
export const fetchAsyncMovies = createAsyncThunk(
  "fetchAsyncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);
// End Apis for ShowMovies and MovieDetails

// Send userData to Mongodb database for using api

export const saveUserToDatabase = createAsyncThunk(
  "users/saveUserToDatabase",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/users", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  user: {},
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.status = "succeeded";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectMovieOrShow = action.payload;
      })

      .addCase(saveUserToDatabase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveUserToDatabase.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(saveUserToDatabase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setUser, setStatus, setError, clearError, logout } =
  movieSlice.actions;
export default movieSlice.reducer;
