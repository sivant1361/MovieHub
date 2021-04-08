import { useState, useEffect } from "react";
import {
  createMuiTheme,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumberOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&page=${page}&query=${searchText}`
    );
    setContent([...data.results]);
    setNumberOfPages(data.total_pages);
    // return [...data.results];
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  useEffect(() => {
    fetchSearch();
    window.scroll(0, 0);
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(e.target.value);
              console.log(content);
            }}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={() => {
              fetchSearch();
            }}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Series" />
        </Tabs>
      </ThemeProvider>
      <div className="movie">
        {content &&
          content.map((val, index) => (
            <SingleContent
              key={val.id}
              id={val.id}
              title={val.title || val.name}
              poster={val.poster_path}
              date={val.release_date || val.first_air_date}
              media_type={type ? "tv" : "movie"}
              vote_average={val.vote_average}
            />
          ))}
        {searchText &&
          content.length === 0 &&
          (type ? <h2>No Series found</h2> : <h2>No Movies found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
