import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const toAddNewMovie = () => {
        history.push('/form');
      }
    return (

        <CssBaseline>
            <main >
                <Button onClick={toAddNewMovie} sx={{ mb:'3em'}}>
                    Add New Movie
                </Button>
                <section className="movies">
                    <Grid container
                        justifyContent="center"
                        alignItems="center" item spacing={5}>
                        {movies.map((movie, index) => {
                            return (
                                <Grid key={index} item >
                                    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: '1.5em' }} color="text.secondary" gutterBottom>{movie.title}</Typography>
                                            <Link to={`/details/${movie.id}`}>
                                                <img src={movie.poster} alt={movie.title} />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </section>

            </main>
        </CssBaseline>

    );
}

export default MovieList;
