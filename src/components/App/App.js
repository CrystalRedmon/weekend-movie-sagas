import { HashRouter as Router, Route, useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieItem from '../MovieItem/MovieItem';
import MovieForm from '../MovieForm/MovieForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import AddMovie from '../AddMovie/AddMovie';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const history = useHistory();
  
  const toAddNewMovie=()=> {
    history.push('/form');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header>
          <h1>The Movies Saga!</h1>

        </header>

        <Button onClick={toAddNewMovie} variant="contained">
          Add New Movie
        </Button>

        {/* <AddMovie /> */}
        <Router>
          {/* <nav>
            <Link to='/' sx={{mb: '2em'}}>Add New Movie</Link>
          </nav> */}

          <Route path="/" exact>
            <MovieList />
          </Route>

          {/* Details page */}
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
