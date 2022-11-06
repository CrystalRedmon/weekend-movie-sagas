import { FormControl, Input, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';



function MovieForm() {



    return (<>
       <CssBaseline>
            <h1>Add More Movies</h1>
            <FormControl>
                <InputLabel htmlFor="movie_title">Movie Title</InputLabel>
                <Input id="movie_title" type="text" />

            </FormControl>
            
            </CssBaseline>
    </>)
}

export default MovieForm;