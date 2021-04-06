import { BrowserRouter, Route, Switch } from "react-router-dom";
import SimpleBottomNavigation from "./components/MainNav";
import Container from "@material-ui/core/Container";
import "./App.css";

import Header from "./components/Header/header";
import Trending from "./pages/trending/trending";
import Movies from "./pages/movies/movies";
import Series from "./pages/series/series";
import Search from "./pages/search/search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
