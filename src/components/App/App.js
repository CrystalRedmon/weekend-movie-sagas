import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieItem from '../MovieItem/MovieItem';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
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
  );
}


export default App;
