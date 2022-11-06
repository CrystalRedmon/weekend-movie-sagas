import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
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

function MovieItem() {
    // GET MOVIE INFO FROM REDUX STORE
    const activeMovie = useSelector(store => store.activeMovie);
    const genres = useSelector(store => store.genres);
    // PARAMS IDENTIFIES THE ID OF THE MOVIE
    const params = useParams();
    // USED TO MAKE ACTION REQUESTS TO REDUCER
    const dispatch = useDispatch();
    // USED TO NAVIGATE TO LIST PAGE
    const history = useHistory();

    console.log('Movie genres', genres);

    // CALL TO GET INFO FROM DATABASE FOR SPECIFIC MOVIEITEM BASED ON PARAMS.ID
    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_MOVIE',
            payload: `/${params.id}`
        })

        dispatch({
            type: 'FETCH_GENRES',
            payload: `/${params.id}`
        })
    }, [params.id])

    function handleOnClick() {
        history.push("/")

    }

    return (<>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                
                <Grid container
                    justifyContent="center"
                    alignItems="center" item spacing={0}>

                    <Card sx={{ minWidth: 275, maxWidth: 700 }}>
                        <CardContent>
                            <Typography sx={{fontSize: '2em'}} >{activeMovie.title}</Typography>
                            <img src={activeMovie.poster} alt="movie poster" width='300' />
                            <div>Genres: {genres.map((genre, index) => (
                                <ul key={index}>
                                    <li >{genre}</li>
                                </ul>
                            ))}</div>
                            <Typography sx={{ textAlign: 'justify' }}>{activeMovie.description}</Typography>
                        </CardContent>

                    </Card>
                </Grid>
                <Button onClick={handleOnClick}>Back To List</Button>

            </CssBaseline>
        </ThemeProvider>
    </>)
}

export default MovieItem;