import React from "react";

const PlayMovie = () => {
  return (
    <div>
      <div className="flex justify-center my-8 ">
        <iframe
          width="760"
          height="455"
          src="https://www.youtube.com/embed/qmIWrVY8etk?si=y13j89rafeSktl0e"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default PlayMovie;
