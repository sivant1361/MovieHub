import { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import "./trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent([...data.results]);
    // return [...data.results];
  };


  useEffect(() => {
    fetchTrending();
    // console.log(content);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      <CustomPagination setPage={setPage}/>
    </div>
  );
};

export default Trending;
