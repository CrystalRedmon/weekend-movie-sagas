import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';
import { Link } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <Link key={movie.id} to= "/details/:id">
                            <div >
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} />
                            </div>
                        </Link>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;