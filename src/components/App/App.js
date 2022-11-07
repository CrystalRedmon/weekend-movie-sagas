import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieItem from '../MovieItem/MovieItem';
import MovieForm from '../MovieForm/MovieForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header>
          <h1>The Movies Saga!</h1>
        </header>
        <Router>
          <Route path="/" exact>
            <MovieList />
          </Route>
          <Route path="/details/:id" exact>
            <MovieItem />
          </Route>
          <Route path='/form/' exact>
            <MovieForm />
          </Route>
        </Router>
      </div>
    </ThemeProvider>
  );
}


export default App;
