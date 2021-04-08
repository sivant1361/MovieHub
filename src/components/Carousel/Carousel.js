import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";
import { img_300, noPicture } from "../../config/config";

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setCredits(data.cast);
  };
  const responsive = {
    0: { items: 3 },
    512: { items: 5 },
    1024: { items: 7 },
  };
  const handleDragStart = (e) => e.preventDefault();
  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
      />
      <b className="carouselItem_img">{c?.name}</b>
    </div>
  ));
  useEffect(() => {
    fetchCredits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
