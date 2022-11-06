import { HashRouter as Router, Route } from 'react-router-dom';
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
        <h1>The Movies Saga!</h1>
        <Router>
          
          <Route path='/form' exact>
            <MovieForm />
          </Route>

          <Route path="/" exact>
            <MovieList />
          </Route>

          {/* Details page */}
          <Route path="/details/:id" exact>
            <MovieItem />
          </Route>


          {/* ⬇️ STRETCH GOAL */}
          {/* Add Movie page */}
        </Router>
      </div>
    </ThemeProvider>
  );
}


export default App;
