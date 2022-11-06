import { FormControl, Input, ButtonGroup, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';



function MovieForm() {
    const dispatch = useDispatch();
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre: ''
    })


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




    return (<>
        <CssBaseline>
            <h1>Add More Movies</h1>
            <form onSubmit={handleSubmit}>
                <FormControl >

                    <Input
                        onChange={addMovieTitle}
                        id="movie_title"
                        type="text"
                        placeholder='Movie Title' />
                </FormControl>

                {/* TODO CHANGE POSTER INPUT TO TYPE URL */}
                <FormControl >
                    <Input
                        onChange={addMoviePoster}
                        id="poster_url"
                        type="text"
                        placeholder='Poster URL' />
                </FormControl>

                <FormControl >
                    <Input
                        onChange={addMovieDescription}
                        id="description"
                        type="textarea"
                        placeholder='Movie Description' />
                </FormControl><br />


                {/* TODO- CREATE DROPDOWN AND ADD REMAINING GENRES */}


                <ButtonGroup variant="contained">
                    <Button
                        onClick={addMovieGenre}
                        value='adventure'
                    >Adventure

                    </Button>

                    <Button
                        onClick={addMovieGenre}
                        value='animated'
                    >Animated</Button>

                    <Button
                        onClick={addMovieGenre}
                        value='biographical'
                    >Biographical</Button>
                </ButtonGroup>

                <Button type='submit'>Submit</Button>
            </form>



            {/* <FormControl width={'300'}>
                <InputLabel>Genre</InputLabel>
                <Select
                    onChange={addMovieGenre}
                    value={'genre'}
                    label="Genre">


                    <MenuItem
                        value={'adventure'}>Adventure
                    </MenuItem>
                    <MenuItem
                        value={'animated'}>Animated
                    </MenuItem>
                    <MenuItem
                        value={'biographical'}>Biographical
                    </MenuItem>
                </Select>
            </FormControl> */}




        </CssBaseline>
    </>)
}

export default MovieForm;


{/* <Input
                    onClick={addMovieDescription}
                    id="description"
                    type="dropdown"
                    placeholder='Movie Description' /> */}