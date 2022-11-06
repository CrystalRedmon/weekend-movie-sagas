import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';



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

        <h1>{activeMovie.title}</h1>
        <div>
            <img src={activeMovie.poster} alt="movie poster" />
            <div>Genres: {genres.map((genre, index) => (
                <ul key={index}>
                    <li >{genre}</li>
                </ul>
            ))}</div>
            <p>{activeMovie.description}</p>
        </div>
        <button onClick={handleOnClick}>Back To List</button>



    </>)
}

export default MovieItem;