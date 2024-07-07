import React, { useEffect } from "react";
import "./MovieDetails.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovieOrShowDetail } from "../../features/movies/movieSlice";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const { selectMovieOrShow } = useSelector((state) => state.app);
  // console.log(selectMovieOrShow);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
  }, [dispatch, imdbID]);

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
                IMDB Rating <i className="fa fa-star"></i> :{" "}
                {selectMovieOrShow.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {selectMovieOrShow.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> :{" "}
                {selectMovieOrShow.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> :{" "}
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
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
