import { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import "./trending.css";

const Trending = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    fetchTrending();
    // console.log(content);
  }, []);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setContent([...data.results]);
    // return [...data.results];
  };

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((val, index) => (
            <SingleContent
              key={val.id}
              id={val.id}
              title={val.title || val.name}
              poster={val.poster_path}
              date={val.release_date || val.first_air_date}
              media_type={val.media_type}
              vote_average={val.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Trending;
