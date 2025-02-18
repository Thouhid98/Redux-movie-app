import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import { fetchAsyncShows } from "../../features/movies/movieSlice";
import "./MovieListing.scss";
import Slider from "react-slick";

const MovieListing = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  const dispatch = useDispatch();
  const showText = "Friends";
  const { movies, shows } = useSelector((state) => state.app);
  // console.log("All shows", shows);
  useEffect(() => {
    dispatch(fetchAsyncShows(showText));
  }, []);

  let renderMovies,
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => <MovieCard key={index} data={movie} />)
    ) : (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <Slider {...settings}>{renderShows}</Slider>
      </div>
    </div>
  );
};

export default MovieListing;
