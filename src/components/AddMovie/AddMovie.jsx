import { useHistory } from 'react-router-dom';

function AddMovie() {

const history = useHistory();
const handleClick =()=> {
    history.push('/form/')
}


    return (<>
        
         <button onClick={handleClick}>Add A New Epic Movie!</button>

    </>)
}

export default AddMovie;