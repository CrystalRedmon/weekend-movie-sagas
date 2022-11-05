import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';



function MovieItem() {
    // GET MOVIE INFO FROM REDUX STORE
    const activeMovie = useSelector(store => store.activeMovie)
    // PARAMS IDENTIFIES THE ID OF THE MOVIE
    const params = useParams();
    // USED TO MAKE ACTION REQUESTS TO REDUCER
    const dispatch = useDispatch();

    console.log('Active movie', activeMovie);

    // CALL TO GET INFO FROM DATABASE FOR SPECIFIC MOVIEITEM BASED ON PARAMS.ID
    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_MOVIE',
            payload: `/${params.id}`
        })
    }, [params.id])


    return (<>

        <h1>{activeMovie.title}</h1>
        <div>
            <img src={activeMovie.poster} alt="movie poster" />
            <p>{activeMovie.description}</p>
        </div>



    </>)
}

export default MovieItem;