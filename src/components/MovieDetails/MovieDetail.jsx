import React, { useEffect } from "react";
import "./MovieDetails.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  watchedMovies,
} from "../../features/movies/movieSlice";
import { Link, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectMovieOrShow, user } = useSelector((state) => state.app);
  const isLoggedIn = !!user?.email;
  // console.log(selectMovieOrShow);
  const userEmail = user?.email;

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
  }, [dispatch, imdbID]);

  const handleWatchedMovies = (e) => {
    e.preventDefault();
    const emailAndDetails = { selectMovieOrShow, userEmail };
    console.log(emailAndDetails);
    //sending the user data and movie details to store and database
    dispatch(watchedMovies(emailAndDetails));
    navigate("/playmovie");
  };

  return (
    <div className="movie-section">
      {Object.keys(selectMovieOrShow).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{selectMovieOrShow.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star"></i>
                {selectMovieOrShow.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i>
                {selectMovieOrShow.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i>
                {selectMovieOrShow.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i>
                {selectMovieOrShow.Year}
              </span>
            </div>
            <div className="movie-plot">{selectMovieOrShow.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{selectMovieOrShow.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{selectMovieOrShow.Actors}</span>
              </div>
              <div>
                <span>Generes</span>
                <span>{selectMovieOrShow.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{selectMovieOrShow.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{selectMovieOrShow.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={selectMovieOrShow.Poster} alt={selectMovieOrShow.Title} />

            {isLoggedIn ? (
              // <Link to="/playmovie">
              <button
                onClick={handleWatchedMovies}
                className="btn w-[340px] mt-2  bg-gray-500"
              >
                Play Now
              </button>
            ) : (
              // </Link>
              <button className="btn w-[340px] mt-2  bg-gray-300" disabled>
                Play Now
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
