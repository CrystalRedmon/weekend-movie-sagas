import { FormControl, Input, ButtonGroup, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid';

function MovieForm() {

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GENRES' })

    }, []);

    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre: ''
    })
    console.log(genres);

    /// EVENTS TO HANDLE EVENT INPUT 
    const addMovieTitle = (event) => {
        setNewMovie({
            ...newMovie,
            title: event.target.value
        });
        console.log(newMovie)
    };

    const addMoviePoster = (event) => {
        setNewMovie({
            ...newMovie,
            url: event.target.value
        });
        console.log(newMovie)
    };

    const addMovieDescription = (event) => {
        setNewMovie({
            ...newMovie,
            description: event.target.value
        });
        console.log(newMovie)
    };

    const addMovieGenre = (event) => {
        setNewMovie({
            ...newMovie,
            genre: event.target.value
        });
        console.log(newMovie)
    };

    //// DISPATCH NEW MOVIE INFO TO WATCHER SAGA
    function handleSubmit(evt) {
        evt.preventDefault();

        dispatch({
            type: 'CREATE_NEW_MOVIE',
            payload: newMovie
        })
        console.log('inside handleSubmit', newMovie)

    }

    /// TO NAVIGATE TO ADD NEW MOVIE
    const toAddNewMovie = () => {
        history.push('/');
    }

    return (<>
        <CssBaseline>
            <header>
                <h1>Add More Movies</h1>
                <Button onClick={toAddNewMovie}>Back to List</Button>
            </header>
            <form onSubmit={handleSubmit} >
                <Grid
                    container
                    direction={'column'}
                    sx={{ minWidth: 275, maxWidth: 700, margin: 'auto', mt: '5em' }}>
                    <FormControl >
                        <Input
                            onChange={addMovieTitle}
                            id="movie_title"
                            type="text"
                            placeholder='Movie Title' />
                    </FormControl>
                    <FormControl >
                        <Input
                            onChange={addMoviePoster}
                            id="poster_url"
                            type="url"
                            placeholder='Poster URL' />
                    </FormControl>
                    <FormControl >
                        <Input
                            onChange={addMovieDescription}
                            id="description"
                            type="textarea"
                            placeholder='Movie Description' />
                    </FormControl>
                    <select
                        onChange={addMovieGenre}
                        value="">
                        <option name="dropFrom" value="" disabled>Select a category</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    <Button type='submit'>Submit</Button>
                </Grid>
            </form>
        </CssBaseline>
    </>)
}

export default MovieForm;