import { useEffect, useState } from "react";
import axios from "axios";

// import "./movie.css";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genre from "../../components/genre";
import useGenre from "../../components/Hooks/useGenre";

const Series = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumberOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreForURL}`
    );
    setContent([...data.results]);
    setNumberOfPages(data.total_pages);
    // return [...data.results];
  };

  useEffect(() => {
    fetchSeries();
    // console.log(content);
  }, [page, genreForURL]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genre
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movie">
        {content &&
          content.map((val, index) => (
            <SingleContent
              key={val.id}
              id={val.id}
              title={val.title || val.name}
              poster={val.poster_path}
              date={val.release_date || val.first_air_date}
              media_type="tv"
              vote_average={val.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
