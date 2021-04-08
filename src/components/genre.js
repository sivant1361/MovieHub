import { useEffect, useState } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";
const Genre = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    // console.log(data.genres);
    setGenres(data.genres);
    setPage(1);
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleRemove = (genre) => {
    setGenres([...genres, genre]);
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            size="small"
            color="primary"
            key={genre.id}
            onDelete={() => {
              handleRemove(genre);
            }}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            size="small"
            key={genre.id}
            onClick={() => {
              handleAdd(genre);
            }}
          />
        ))}
    </div>
  );
};

export default Genre;
