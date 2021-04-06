import { useEffect, useState } from "react";
import axios from "axios";

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
          content.map((val) => {
            // return(<p>{val}</p>)
            console.log(val);
          })}
      </div>
    </div>
  );
};

export default Trending;
