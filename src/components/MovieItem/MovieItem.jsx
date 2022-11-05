import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';



function MovieItem(){
    // GET MOVIE INFO FROM REDUX STORE
    const activeMovieDetails = useSelector(store=> store.movies)
    // PARAMS IDENTIFIES THE ID OF THE MOVIE
    const params = useParams();
    // USED TO MAKE ACTION REQUESTS TO REDUCER
    const dispatch = useDispatch();

    console.log('params.id,', params.id, "vs Active movie details: ", activeMovieDetails.id);
 

    // CALL TO GET INFO FROM DATABASE FOR SPECIFIC MOVIEITEM BASED ON PARAMS.ID
    useEffect(()=>{
        dispatch({
            type: 'SET_ACTIVE_BOOK',
            payload: `movie/${params.id}`
        })
    }, [])


    return(<>
    
    <h1>MovieItem Name</h1>

    
    
    
    </>)
}

export default MovieItem;