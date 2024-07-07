import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

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
        console.log("Fetched Successfully!");
        state.selectMovieOrShow = action.payload;
      });
  },
});
export const { setUser, setStatus, setError, clearError, logout } =
  movieSlice.actions;
export default movieSlice.reducer;
