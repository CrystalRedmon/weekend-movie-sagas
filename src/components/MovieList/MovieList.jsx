import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <main >

                    {/* <Typography sx={{fontSize: '1.75em'}}>MovieList</Typography> */}
                    <section className="movies">
                        <Grid container
                            justifyContent="center"
                            alignItems="center" item spacing={5}>
                            {movies.map((movie, index) => {
                                return (
                                    <Grid key={index} item spacing={5}>
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
        </ThemeProvider>
    );
}

export default MovieList;
